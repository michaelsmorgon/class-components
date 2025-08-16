import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (!error) {
    return 'Unknown error';
  }

  if ('status' in error) {
    const err = error as FetchBaseQueryError;
    return `Error ${err.status}: ${
      typeof err.data === 'string' ? err.data : JSON.stringify(err.data)
    }`;
  }

  if ('message' in error) {
    const err = error as SerializedError;
    return err.message || 'Unknown error';
  }

  return 'An unexpected error occurred';
}
