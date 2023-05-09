import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from './index';
import '@testing-library/jest-dom';
import { mockCountries } from '@/common/mockData/countryMockData';

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders main heading', () => {
    render(<Home countries={mockCountries}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });
 
    expect(heading).toBeInTheDocument();
  });

  it('gets and returns static props', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockCountries)
    );
    const response = await getStaticProps({});
    expect(response.props.countries).toEqual(mockCountries);
  })
});