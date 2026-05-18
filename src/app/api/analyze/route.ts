import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { skills, user } = await request.json();

    if (!skills) {
      return NextResponse.json({ error: 'Missing skill scores.' }, { status: 400 });
    }

    // Advanced mock logic for overall CEFR mapping
    const avgScore = (skills.reading + skills.listening + skills.writing + skills.speaking) / 4;

    let level = 'A1';
    if (avgScore >= 90) level = 'C2';
    else if (avgScore >= 80) level = 'C1';
    else if (avgScore >= 65) level = 'B2';
    else if (avgScore >= 50) level = 'B1';
    else if (avgScore >= 35) level = 'A2';

    const result = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      skills: {
        reading: skills.reading,
        listening: skills.listening,
        writing: skills.writing,
        speaking: skills.speaking,
      },
      overallLevel: level,
      overallScore: Math.round(avgScore),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Final analysis error:', error);
    return NextResponse.json({ error: 'Failed to generate final report.' }, { status: 500 });
  }
}
