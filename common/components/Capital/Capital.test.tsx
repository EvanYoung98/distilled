import { render, screen } from '@testing-library/react';
import Capital from './Capital.component';

describe('Country Card', () => {
  const mockCapital = [
    'Dublin'
  ]
  const mockCapitals = [
    'Dublin',
    'London',
    'Madrid'
  ]
  it('should render card and display image correctly', () => {
    render(
      <Capital capital={mockCapital} />
    );
    const text = screen.getByTestId('capital-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Capital: Dublin')
  })
  it('should render card and display image correctly', () => {
    render(
      <Capital capital={mockCapitals} />
    );
    const text = screen.getByTestId('capital-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Capitals: Dublin, London, Madrid')
  })
});