import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders the footer', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('render the authors section', () => {
    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Evguenia Zelenko')).toBeInTheDocument();
    expect(screen.getByText('Alexander Abyzov')).toBeInTheDocument();
    expect(screen.getByText('Julia Holadava')).toBeInTheDocument();
  });

  test('render the year', () => {
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  test('render the course logo', () => {
    const courseLogo = screen.getByAltText('Course Logo');
    expect(courseLogo).toBeInTheDocument();
    expect(courseLogo).toHaveAttribute('src', '/rs_school_js.svg');
  });
});
