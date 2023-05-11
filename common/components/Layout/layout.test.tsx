import { render, screen } from '@testing-library/react';
import Layout from './layout';

describe('Country Card', () => {
  it('should render layout and display buttons', () => {
    render(
      <Layout showHomeButton={true} showLanguageButton={true}>
        <p data-testid="content">TEST STRING</p>
      </Layout>
    );
    const homeButton = screen.getByTestId('home-button');
    expect(homeButton).toHaveTextContent('Home')
    const langugaugesButton = screen.getByTestId('languages-button');
    expect(langugaugesButton).toHaveTextContent('Languages')
  })

  it('should not render home button if false', () => {
    render(
      <Layout showHomeButton={false} showLanguageButton={true}>
        <p data-testid="content">TEST STRING</p>
      </Layout>
    );
    expect(screen.queryByTestId('home-button')).toBeFalsy();
    const languageButton = screen.getByTestId('languages-button');
    expect(languageButton).toHaveTextContent('Languages')
  })

  it('should not render language button if false', () => {
    render(
      <Layout showHomeButton={true} showLanguageButton={false}>
        <p data-testid="content">TEST STRING</p>
      </Layout>
    );
    expect(screen.queryByTestId('languages-button')).toBeFalsy();
    const homeButton = screen.getByTestId('home-button');
    expect(homeButton).toHaveTextContent('Home')
  })
});