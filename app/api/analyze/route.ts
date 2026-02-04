import { NextRequest, NextResponse } from 'next/server';
import { analyzeContractWithAI } from '@/lib/ai-analyzer';
import { createClient } from '@/lib/supabase/server';

// Security: File size limit (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Security: Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 413 }
      );
    }

    // Security: Validate file type
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF files are supported.' },
        { status: 400 }
      );
    }

    // Extract text from PDF
    const buffer = Buffer.from(await file.arrayBuffer());
    let text = '';

    if (file.type === 'application/pdf') {
      try {
        // Use pdfjs-dist for reliable PDF parsing in Node.js
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.js');

        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(buffer),
          useSystemFonts: true,
        });

        const pdfDocument = await loadingTask.promise;
        const numPages = pdfDocument.numPages;

        // Extract text from all pages
        for (let i = 1; i <= numPages; i++) {
          const page = await pdfDocument.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item: any) => item.str)
            .join(' ');
          text += pageText + '\n';
        }
      } catch (error: any) {
        console.error('PDF parsing error:', error);
        return NextResponse.json(
          { error: `Failed to parse PDF: ${error.message || 'Unknown error'}` },
          { status: 400 }
        );
      }
    } else if (file.type.includes('word') || file.type.includes('document')) {
      // For Word docs, we'd need mammoth or similar
      // For MVP, we'll just return an error asking for PDF
      return NextResponse.json(
        { error: 'Please convert to PDF first (Word doc support coming soon)' },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 100) {
      return NextResponse.json(
        { error: 'Could not extract text from document' },
        { status: 400 }
      );
    }

    // Analyze with AI
    const analysis = await analyzeContractWithAI(text);

    // Save analysis to database if user is authenticated
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('analyses').insert({
          user_id: user.id,
          file_name: file.name,
          file_size: file.size,
          overall_risk: analysis.overallRisk,
          risk_score: analysis.riskScore,
          red_flags_count: analysis.redFlags.length,
          summary: analysis.summary,
          red_flags: analysis.redFlags,
        });
      }
    } catch (dbError) {
      console.error('Failed to save analysis to database:', dbError);
      // Don't fail the request if database save fails
    }

    return NextResponse.json({
      success: true,
      analysis,
      textLength: text.length,
      fileName: file.name,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze contract' },
      { status: 500 }
    );
  }
}
