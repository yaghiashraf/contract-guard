// AI Contract Analyzer using Hugging Face Inference API
// Note: Using a smaller, faster model that works with the free tier
// Updated to use new router endpoint (api-inference.huggingface.co is deprecated)
const HF_API_URL = 'https://router.huggingface.co/models/facebook/bart-large-cnn';
const HF_TOKEN = process.env.HF_TOKEN;

interface RiskFlag {
  type: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  clause: string;
  recommendation: string;
}

interface ContractAnalysis {
  overallRisk: 'high' | 'medium' | 'low';
  riskScore: number;
  redFlags: RiskFlag[];
  summary: string;
}

export async function analyzeContractWithAI(contractText: string): Promise<ContractAnalysis> {
  // Extract potential problematic clauses using pattern matching
  const potentialIssues = extractRiskyPatterns(contractText);

  // Calculate risk score (0-100)
  const riskScore = calculateRiskScore(potentialIssues);

  const overallRisk = riskScore >= 70 ? 'high' : riskScore >= 40 ? 'medium' : 'low';

  // Generate intelligent summary based on detected issues
  const summary = generateSummary(potentialIssues, overallRisk);

  return {
    overallRisk,
    riskScore,
    redFlags: potentialIssues,
    summary,
  };
}

// Rule-based pattern detection (fast, reliable)
function extractRiskyPatterns(text: string): RiskFlag[] {
  const flags: RiskFlag[] = [];
  const lowerText = text.toLowerCase();

  // Non-compete clauses
  if (lowerText.includes('non-compete') || lowerText.includes('non compete')) {
    const match = extractClause(text, /non[- ]compete/i, 200);
    flags.push({
      type: 'non-compete',
      severity: 'high',
      title: 'Non-Compete Clause Detected',
      description: 'This contract may restrict your ability to work in your industry after leaving.',
      clause: match,
      recommendation: 'Negotiate the duration and geographic scope. 6 months + local area is reasonable. 2 years + nationwide is excessive.',
    });
  }

  // Unlimited liability
  if (lowerText.includes('unlimited liability') || lowerText.includes('sole liability')) {
    const match = extractClause(text, /unlimited liability|sole liability/i, 200);
    flags.push({
      type: 'liability',
      severity: 'high',
      title: 'Unlimited Liability',
      description: 'You could be responsible for unlimited damages if something goes wrong.',
      clause: match,
      recommendation: 'Cap liability at 1-2x the contract value. Never accept unlimited liability.',
    });
  }

  // IP transfer
  if (lowerText.includes('intellectual property') && (lowerText.includes('transfer') || lowerText.includes('assign') || lowerText.includes('work for hire'))) {
    const match = extractClause(text, /intellectual property.{0,100}(transfer|assign|work for hire)/i, 200);
    flags.push({
      type: 'ip-rights',
      severity: 'high',
      title: 'Intellectual Property Transfer',
      description: 'This contract may give the other party ownership of your work or ideas.',
      clause: match,
      recommendation: 'Specify exactly what IP is transferred. Retain rights to pre-existing work and side projects.',
    });
  }

  // Auto-renewal
  if (lowerText.includes('auto') && lowerText.includes('renew')) {
    const match = extractClause(text, /auto.{0,20}renew/i, 200);
    flags.push({
      type: 'auto-renewal',
      severity: 'medium',
      title: 'Automatic Renewal Clause',
      description: 'Contract automatically renews unless you cancel (often with short notice periods).',
      clause: match,
      recommendation: 'Set calendar reminder 60 days before renewal. Negotiate opt-in renewal instead.',
    });
  }

  // Unfair termination
  if (lowerText.includes('termination') && (lowerText.includes('at will') || lowerText.includes('without cause'))) {
    const match = extractClause(text, /termination.{0,100}(at will|without cause)/i, 200);
    flags.push({
      type: 'termination',
      severity: 'medium',
      title: 'Unfair Termination Terms',
      description: 'The other party can terminate without cause, but you may not have the same right.',
      clause: match,
      recommendation: 'Ensure termination rights are mutual. Require 30-90 days notice.',
    });
  }

  // Indemnification
  if (lowerText.includes('indemnify') || lowerText.includes('hold harmless')) {
    const match = extractClause(text, /indemnify|hold harmless/i, 200);
    flags.push({
      type: 'indemnification',
      severity: 'medium',
      title: 'Indemnification Clause',
      description: 'You may be required to pay legal fees and damages if they get sued.',
      clause: match,
      recommendation: 'Limit indemnification to cases where you were actually at fault. Exclude third-party claims.',
    });
  }

  // Arbitration
  if (lowerText.includes('arbitration') && lowerText.includes('binding')) {
    const match = extractClause(text, /binding.{0,20}arbitration/i, 200);
    flags.push({
      type: 'arbitration',
      severity: 'low',
      title: 'Mandatory Arbitration',
      description: 'You waive your right to sue in court and must use arbitration.',
      clause: match,
      recommendation: 'Check if arbitration costs are shared fairly. Ensure location is convenient.',
    });
  }

  return flags;
}

// Extract surrounding clause text
function extractClause(text: string, pattern: RegExp, contextLength: number = 200): string {
  const match = text.match(pattern);
  if (!match || match.index === undefined) return '';

  const start = Math.max(0, match.index - contextLength / 2);
  const end = Math.min(text.length, match.index + match[0].length + contextLength / 2);

  return '...' + text.substring(start, end).trim() + '...';
}

// AI-powered deep analysis (currently disabled due to HF API changes)
// Using rule-based summary generation instead - see generateSummary()
async function getAIInsights_DISABLED(contractText: string): Promise<{ redFlags: RiskFlag[]; summary: string }> {
  // Truncate to first 3000 chars to fit in free tier limits
  const truncated = contractText.substring(0, 3000);

  const prompt = `Analyze this contract for hidden risks and unfair terms. Focus on:
- Payment terms (hidden fees, penalties)
- Confidentiality overreach
- Jurisdiction/venue clauses
- Warranty disclaimers
- Force majeure abuse

Contract excerpt:
${truncated}

Provide a brief summary of the key risks in plain English (2-3 sentences).`;

  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('HF API Error:', response.status, errorData);
      throw new Error(`AI API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('HF API Response:', data);
    const aiSummary = data[0]?.generated_text || 'Unable to generate AI insights at this time.';

    // Extract summary from AI response
    const summaryMatch = aiSummary.split(prompt)[1] || aiSummary;

    return {
      redFlags: [], // AI insights are added to summary for now
      summary: summaryMatch.trim().substring(0, 500),
    };
  } catch (error) {
    console.error('AI analysis failed:', error);
    return {
      redFlags: [],
      summary: 'AI analysis unavailable. Rule-based analysis completed successfully.',
    };
  }
}

function calculateRiskScore(flags: RiskFlag[]): number {
  const weights = {
    high: 30,
    medium: 15,
    low: 5,
  };

  const score = flags.reduce((total, flag) => total + weights[flag.severity], 0);
  return Math.min(100, score);
}

function generateSummary(flags: RiskFlag[], overallRisk: string): string {
  if (flags.length === 0) {
    return 'No major red flags detected in this contract. However, we still recommend having a lawyer review important agreements.';
  }

  const highRiskFlags = flags.filter(f => f.severity === 'high');
  const mediumRiskFlags = flags.filter(f => f.severity === 'medium');

  let summary = '';

  if (highRiskFlags.length > 0) {
    const types = highRiskFlags.map(f => f.type).join(', ');
    summary += `⚠️ HIGH RISK: This contract contains ${highRiskFlags.length} serious issue${highRiskFlags.length > 1 ? 's' : ''} (${types}). `;
  }

  if (mediumRiskFlags.length > 0) {
    summary += `Found ${mediumRiskFlags.length} moderate concern${mediumRiskFlags.length > 1 ? 's' : ''} that should be reviewed. `;
  }

  if (overallRisk === 'high') {
    summary += 'We strongly recommend having a lawyer review this contract before signing.';
  } else if (overallRisk === 'medium') {
    summary += 'Consider negotiating these terms or consulting with a lawyer.';
  } else {
    summary += 'Review the flagged items carefully before proceeding.';
  }

  return summary;
}
