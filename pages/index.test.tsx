import { render, screen } from '@testing-library/react';
import Home, { getStaticProps } from './index';
import '@testing-library/jest-dom';
import { mockCountries } from '@/common/mockData/countryMockData';

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders main heading', () => {
    render(<Home countries={mockCountries} err={false}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });

    expect(heading).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).toBeFalsy();

  });

  it('renders err', () => {
    render(<Home countries={[]} err={true}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });
    const error = screen.getByTestId('error-message');

    expect(heading).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });

  it('gets and returns static props', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockCountries)
    );
    const response = await getStaticProps({});
    expect(response.props.countries).toEqual(mockCountries);
  })

  it('handles prop error', async () => {
    fetch.mockRejectOnce(
      'https://restcountries.com/v3.1/all?fields=name,capital,currencies,cca2,flags,population'
    );
    const response = await getStaticProps({});
    expect(response.props.countries).toEqual([]);
    expect(response.props.err).toEqual(true);

  })
});