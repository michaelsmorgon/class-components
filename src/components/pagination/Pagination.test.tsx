import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
}));

describe('Pagination component', () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  it('renders the current page number', () => {
    render(<Pagination page="3" />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables the "previous" button on the first page', () => {
    render(<Pagination page="1" />);
    const prevButton = screen.getByRole('button', { name: '<' });
    expect(prevButton).toBeDisabled();
  });

  it('enables the "next" button', () => {
    render(<Pagination page="2" />);
    const nextButton = screen.getByRole('button', { name: '>' });
    expect(nextButton).toBeEnabled();
  });

  it('navigates to previous page when clicking "<"', () => {
    render(<Pagination page="3" />);
    const prevButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(prevButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('navigates to next page when clicking ">"', () => {
    render(<Pagination page="3" />);
    const nextButton = screen.getByRole('button', { name: '>' });
    fireEvent.click(nextButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/?page=4');
  });
});
