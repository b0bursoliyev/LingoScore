import { describe, it, expect } from 'vitest';
import { POST } from '../route';

describe('POST /api/analyze', () => {
  it('returns 400 if skills are missing', async () => {
    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing skill scores.');
  });

  it('aggregates skills and returns a report', async () => {
    const skills = { reading: 80, listening: 80, writing: 80, speaking: 80 };
    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ skills }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.overallLevel).toBe('C1');
    expect(data.overallScore).toBe(80);
  });
});
