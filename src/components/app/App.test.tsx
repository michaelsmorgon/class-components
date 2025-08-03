import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { describe, expect, test } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../redux/Store';

describe('App routing', () => {
  const PLACEHOLDER = 'Type text here...';
  const BUTTON = { name: /search/i };

  test('renders Main page at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByRole('button', BUTTON)).toBeInTheDocument();
  });

  test('renders AboutPage at /about path', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
  });

  test('renders Main for /details/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    // expect(screen.getByText(/main/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByRole('button', BUTTON)).toBeInTheDocument();
  });

  test('renders Not Found for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Sorry, smth went wrong/i)).toBeInTheDocument();
  });
});
