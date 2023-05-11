import { render, screen } from '@testing-library/react';
import LanguagesPage, { getStaticProps } from './index';
import '@testing-library/jest-dom';
import { mockLanguages, mockLanguagesRes } from '@/common/mockData/languageMockData';

describe('Home', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders main heading', () => {
    render(<LanguagesPage languages={mockLanguages} err={false}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });

    expect(heading).toBeInTheDocument();
    expect(screen.queryByTestId('language-English')).toBeTruthy();
    expect(screen.queryByTestId('language-French')).toBeTruthy();
    expect(screen.queryByTestId('language-German')).toBeTruthy();
    expect(screen.queryByTestId('language-Spanish')).toBeFalsy();
  });

  it('renders err', () => {
    render(<LanguagesPage languages={[]} err={true}/>);
 
    const heading = screen.getByRole('heading', {
      name: 'Countries App',
    });
    const error = screen.getByTestId('error-message');

    expect(heading).toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(screen.queryByTestId('language-French')).toBeFalsy();
  });

  it('gets and returns static props', async () => {
    fetch.mockResponseOnce(
      JSON.stringify([mockLanguagesRes]),
      'https://restcountries.com/v3.1/all?fields=languages'
    );
    const response = await getStaticProps({});
    expect(response.props.languages).toEqual(mockLanguages);
  })

  it('handles prop error', async () => {
    fetch.mockRejectOnce(
      'https://restcountries.com/v3.1/all?fields=languages'
    );
    const response = await getStaticProps({});
    expect(response.props.languages).toEqual({});
    expect(response.props.err).toEqual(true);

  })
});