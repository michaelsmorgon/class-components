import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { describe, expect, test } from 'vitest';

describe('App routing', () => {
  const PLACEHOLDER = 'Type text here...';
  const BUTTON = { name: /search/i };

  test('renders Main page at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByRole('button', BUTTON)).toBeInTheDocument();
  });

  test('renders AboutPage at /about path', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
  });

  test('renders Main for /details/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <App />
      </MemoryRouter>
    );
    // expect(screen.getByText(/main/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByRole('button', BUTTON)).toBeInTheDocument();
  });

  test('renders Not Found for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
