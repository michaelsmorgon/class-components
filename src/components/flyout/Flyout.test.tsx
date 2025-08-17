import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Flyout from './Flyout';

describe('Flyout component', () => {
  test('renders correct singular item text', () => {
    render(
      <Flyout selectCount={1} onUnselectAll={() => {}} onDownload={() => {}} />
    );
    expect(screen.getByText(/1 item is selected/i));
  });

  test('renders correct singular item text', () => {
    render(
      <Flyout selectCount={10} onUnselectAll={() => {}} onDownload={() => {}} />
    );
    expect(screen.getByText(/10 items are selected/i));
  });
});
