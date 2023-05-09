import { render, screen } from '@testing-library/react';
import CountryPage, { getStaticProps, getStaticPaths } from './[id]';
import '@testing-library/jest-dom';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { mockBorders, mockCountry, mockCountryNoBorder, mockCountryTwoLanguagesTwoCurrencies, mockStaticPaths } from '@/common/mockData/countryMockData';

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders main card', () => {
    render(<CountryPage country={mockCountry} borders={mockBorders} err={false}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });
 
    expect(heading).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).toBeFalsy();

    const mainCardLink = screen.getByTestId('PT');
    expect(mainCardLink).not.toHaveAttribute('href', '/countries/PT')

    const mainCardContent = screen.getByTestId('PT-main-card-content');
 
    expect(mainCardContent).toHaveTextContent('PortugalCapital: LisbonPopulation: 10,305,564Currency: EuroLanguage: Portuguese')

  });

  it('renders error', () => {
    render(<CountryPage country={mockCountry} borders={mockBorders} err={true}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });
 
    expect(heading).toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).toBeTruthy();

    expect(screen.queryByTestId('PT')).toBeFalsy();

  });

  it('renders main card with no borders', () => {
    render(<CountryPage country={mockCountry} borders={mockBorders} err={false}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });
 
    expect(heading).toBeInTheDocument();

    const mainCardLink = screen.getByTestId('PT');
    expect(mainCardLink).not.toHaveAttribute('href', '/countries/PT')

    const mainCardContent = screen.getByTestId('PT-main-card-content');
 
    expect(mainCardContent).toHaveTextContent('PortugalCapital: LisbonPopulation: 10,305,564Currency: EuroLanguage: Portuguese')

  });

  it('renders main card with more than one langauge and one currency', () => {
    render(<CountryPage country={mockCountryTwoLanguagesTwoCurrencies} borders={mockBorders} err={false}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });
 
    expect(heading).toBeInTheDocument();

    const mainCardLink = screen.getByTestId('PT');
    expect(mainCardLink).not.toHaveAttribute('href', '/countries/PT')

    const mainCardContent = screen.getByTestId('PT-main-card-content');
 
    expect(mainCardContent).toHaveTextContent('PortugalCapital: LisbonPopulation: 10,305,564Currencies: Euro, Euro1Languages: Portuguese, English')

  });

  it('renders border cards', () => {
    render(<CountryPage country={mockCountry} borders={mockBorders} err={false}/>);

    const spainBorderCard = screen.getByTestId('border-card-ES');
    expect(spainBorderCard).toHaveAttribute('href', '/countries/ES')

    const mainCardContent = screen.getByTestId('border-card-content-ES');
 
    expect(mainCardContent).toHaveTextContent('Name: SpainCapital: MadridPopulation: 47,351,567')

  });

  it('gets and returns static props', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockCountry),
      'https://restcountries.com/v3.1/alpha/PT?fields=name,capital,borders,currencies,cca2,flags,population,languages',
    );
    fetch.mockResponseOnce(
      JSON.stringify(mockBorders),
      'https://restcountries.com/v3.1/alpha?codes=ES&fields=name,capital,cca2,flags,population',
    );
    const context = {
      params: {
        id: 'PT'
      } as ParsedUrlQuery
    }
    const response = await getStaticProps(context as GetServerSidePropsContext);
    expect(response.props.country).toEqual(mockCountry);
    expect(response.props.borders).toEqual(mockBorders);
  })

  it('gets and returns static props with no borders', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockCountryNoBorder),
      'https://restcountries.com/v3.1/alpha/PT?fields=name,capital,borders,currencies,cca2,flags,population,languages',
    );
    const context = {
      params: {
        id: 'PT'
      } as ParsedUrlQuery
    }
    const response = await getStaticProps(context as GetServerSidePropsContext);
    expect(response.props.country).toEqual(mockCountryNoBorder);
    expect(response.props.borders).toEqual([]);
  })

  it('handles prop error', async () => {
    fetch.mockRejectOnce(
      {},
      'https://restcountries.com/v3.1/alpha/PT?fields=name,capital,borders,currencies,cca2,flags,population,languages',
    );
    const context = {
      params: {
        id: 'PT'
      } as ParsedUrlQuery
    }
    const response = await getStaticProps(context as GetServerSidePropsContext);
    expect(response.props.country).toEqual({});
    expect(response.props.borders).toEqual([]);
    expect(response.props.err).toEqual(true);
  })

  it('handles static paths', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockStaticPaths),
      'https://restcountries.com/v3.1/all?fields=cca2',
    );
    const response = await getStaticPaths();
    expect(response.paths).toEqual(
      [
        { params: { id: 'PT' } },
        { params: { id: 'ES' } },
        { params: { id: 'IE' } }
      ]
    );
  })

});