import { describe, expect, it, vi } from 'vitest';
import ErrorButton from './ErrorButton';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

describe('error catching tests', () => {
  it('Throws error when test button is clicked and Triggers error boundary fallback UI', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(button);

    expect(
      screen.getByText('Something went wrong. Please reload the page.')
    ).toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalledWith(
      '>>> Error Boundary: ',
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});
