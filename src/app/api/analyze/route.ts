import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const wordCount = text?.trim().split(/\s+/).filter(Boolean).length || 0;

    if (wordCount < 50) {
      return NextResponse.json(
        { error: 'Text must be at least 50 words.' },
        { status: 400 }
      );
    }

    // Mock logic for analysis
    // In a real application, this would call the Google Gemini API or OpenAI API
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
    const avgWordLength = text.length / wordCount;

    // Simulate CEFR level based on complexity
    let level = 'A1';
    let score = 20;

    if (wordCount > 300 && avgWordLength > 6) {
      level = 'C2';
      score = 95;
    } else if (wordCount > 250 && avgWordLength > 5.5) {
      level = 'C1';
      score = 85;
    } else if (wordCount > 150 && avgWordLength > 5) {
      level = 'B2';
      score = 70;
    } else if (wordCount > 100 && avgWordLength > 4.5) {
      level = 'B1';
      score = 55;
    } else if (wordCount > 50 && avgWordLength > 4) {
      level = 'A2';
      score = 40;
    }

    const strengths = [
      'Good use of basic sentence structures.',
      'Clear expression of ideas.',
      wordCount > 100 ? 'Adequate length for the topic.' : 'Concise writing style.'
    ];

    const improvements = [
      'Try to use more complex vocabulary.',
      'Work on connecting sentences with transition words.',
      'Check for minor grammatical inconsistencies.'
    ];

    const grammarErrors = [
      { original: 'dont', suggestion: "don't", type: 'Spelling' },
      { original: 'They is', suggestion: 'They are', type: 'Grammar' }
    ];

    // Response structure
    const analysis = {
      overallLevel: level,
      overallScore: score,
      metrics: {
        reading: Math.min(100, score + 5),
        listening: Math.min(100, score - 2),
        writing: score,
        speaking: Math.min(100, score + 2),
      },
      vocabulary: {
        variety: wordCount > 150 ? 'High' : 'Moderate',
        complexity: avgWordLength > 5.5 ? 'Advanced' : 'Standard',
      },
      grammar: {
        errorCount: grammarErrors.length,
        errors: grammarErrors,
      },
      feedback: {
        strengths,
        improvements,
      },
      wordCount,
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze text.' },
      { status: 500 }
    );
  }
}
