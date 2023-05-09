import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';
import { mockCountry } from '@/common/mockData/countryMockData';

describe('Country Card', () => {
  it('should render card and display image correctly', () => {
    const width = "200"
    render(
      <CountryCard country={mockCountry} width={width} testid={'mock-test-id'}>
        <p data-testid="content">TEST STRING</p>
      </CountryCard>
    );
  
    const card = screen.getByRole('link');
    expect(card).toHaveAttribute('href', '/countries/PT')
    const cardContent = screen.getByTestId('content');
    expect(cardContent).toHaveTextContent('TEST STRING')
    const cardImage = screen.getByTestId('PT-image');
    expect(cardImage).toHaveAttribute('width', width)
    expect(cardImage).toHaveAttribute('height', `${width*.66}`)
  })
});