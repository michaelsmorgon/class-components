import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const ChildWithError = () => {
  throw new Error('Error');
};

describe('error catching tests', () => {
  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ChildWithError />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Something went wrong. Please reload the page.')
    ).toBeInTheDocument();
  });

  it('logs error to console', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(() =>
      render(
        <ErrorBoundary>
          <ChildWithError />
        </ErrorBoundary>
      )
    ).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      '>>> Error Boundary: ',
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});
