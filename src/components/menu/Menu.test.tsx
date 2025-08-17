import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './Menu';
import { describe, expect, test } from 'vitest';

describe('Menu component', () => {
  test('renders Home and About links', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  test('highlights Home link when at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Menu />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/home/i);
    expect(homeLink.className).toMatch(/active/i);
  });

  test('highlights About link when at /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Menu />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink.className).toMatch(/active/i);
  });
});
