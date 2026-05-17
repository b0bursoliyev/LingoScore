import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AssessmentForm from '../AssessmentForm';
import React from 'react';

describe('AssessmentForm', () => {
  it('shows error if submitted with less than 50 words', () => {
    const onAnalyze = vi.fn();
    render(<AssessmentForm onAnalyze={onAnalyze} isLoading={false} />);

    const textarea = screen.getByPlaceholderText(/Paste your essay/i);
    const button = screen.getByRole('button', { name: /Analyze My Level/i });

    fireEvent.change(textarea, { target: { value: 'Too short text' } });
    // Button should be disabled due to our check
    expect(button).toBeDisabled();
  });

  it('enables button and calls onAnalyze with valid text', () => {
    const onAnalyze = vi.fn();
    render(<AssessmentForm onAnalyze={onAnalyze} isLoading={false} />);

    const textarea = screen.getByPlaceholderText(/Paste your essay/i);
    const longText = 'word '.repeat(55);

    fireEvent.change(textarea, { target: { value: longText } });

    const button = screen.getByRole('button', { name: /Analyze My Level/i });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    expect(onAnalyze).toHaveBeenCalledWith(longText);
  });
});
