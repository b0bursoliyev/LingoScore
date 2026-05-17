import { describe, it, expect, vi } from 'vitest';
import { POST } from '../route';

describe('POST /api/analyze', () => {
  it('returns 400 if text is less than 50 words', async () => {
    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: 'Too short' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Text must be at least 50 words.');
  });

  it('returns analysis for valid text', async () => {
    const longText = 'This is a long text that should definitely be more than fifty words. '.repeat(10);
    const request = new Request('http://localhost:3000/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ text: longText }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('overallLevel');
    expect(data).toHaveProperty('overallScore');
    expect(data.wordCount).toBeGreaterThanOrEqual(50);
  });
});
