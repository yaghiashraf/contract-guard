import fs from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

// Test if pdfjs-dist works
console.log('Testing pdfjs-dist...');

// Create a minimal PDF buffer for testing
const testPdfPath = process.argv[2];

if (!testPdfPath) {
  console.log('Usage: node test-pdf.mjs <path-to-pdf>');
  console.log('No PDF provided, but pdfjs-dist import works!');
  process.exit(0);
}

try {
  const buffer = fs.readFileSync(testPdfPath);
  const loadingTask = getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
  });

  const pdfDocument = await loadingTask.promise;
  console.log('✅ PDF loaded successfully!');
  console.log(`   Pages: ${pdfDocument.numPages}`);

  // Extract text from first page
  const page = await pdfDocument.getPage(1);
  const content = await page.getTextContent();
  const text = content.items.map((item) => item.str).join(' ');
  console.log(`   First page text preview: ${text.substring(0, 100)}...`);
  console.log('\n✅ pdfjs-dist is working correctly!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
