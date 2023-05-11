import { render, screen } from '@testing-library/react';
import LanguagePage, { getStaticPaths, getStaticProps } from './[id]';
import '@testing-library/jest-dom';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { mockCountries } from '@/common/mockData/countryMockData';
import { mockLanguagesRes } from '@/common/mockData/languageMockData';

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders main card', () => {
    render(
      <LanguagePage language="testLang" countries={mockCountries} err={false}/>
    );
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });

    const subHeading = screen.getByRole('heading', {
      name: 'testLang',
    });
 
    expect(heading).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
    expect(screen.queryByTestId('lang-card-ES')).toBeTruthy();

  });

  it('renders error', () => {
    render(
      <LanguagePage language="testLang" countries={[]} err={true}/>
    )
    expect(screen.queryByTestId('error-message')).toBeTruthy();

    expect(screen.queryByTestId('lang-card-ES')).toBeFalsy();

  });

  it('gets and returns static props', async () => {
    fetch.mockResponseOnce(
      JSON.stringify(mockCountries),
      'https://restcountries.com/v3.1/lang/Spanish',
    );
    const context = {
      params: {
        id: 'Spanish'
      } as ParsedUrlQuery
    }
    const response = await getStaticProps(context as GetServerSidePropsContext);
    expect(response.props.countries).toEqual(mockCountries);
    expect(response.props.err).toEqual(false);
  })


  it('handles prop error', async () => {
    fetch.mockRejectOnce(
      JSON.stringify(mockCountries),
      'https://restcountries.com/v3.1/lang/Spanish',
    );
    const context = {
      params: {
        id: 'Spanish'
      } as ParsedUrlQuery
    }
    const response = await getStaticProps(context as GetServerSidePropsContext);
    expect(response.props.countries).toEqual([]);
    expect(response.props.err).toEqual(true);
  })

  it('handles static paths', async () => {
    fetch.mockResponseOnce(
      JSON.stringify([mockLanguagesRes]),
      'https://restcountries.com/v3.1/all?fields=languages',
    );
    const response = await getStaticPaths();
    expect(response.paths).toEqual(
      [
        { params: { id: 'English' } },
        { params: { id: 'French' } },
        { params: { id: 'German' } }
      ]
    );
  })

});