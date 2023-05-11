describe('Navigation', () => {
  it('should navigate to the main page and countries page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="PT"]').as('portugal').should('exist');
    // check portugese main card
    cy.get('@portugal').click();
    cy.url().should('contain', '/countries/PT');
    cy.get('[data-testid="PT"]').as('portugalMainCard').should('exist');
    cy.get('@portugalMainCard').should('not.have.attr', 'href', '/countries/PT');
    cy.get('[data-testid="PT-main-card-content"]').as('cardContent').should('exist');
    cy.get('@cardContent').children().eq(0).should('have.text', 'Name: Portugal')
    cy.get('@cardContent').children().eq(1).should('have.text', 'Capital: Lisbon')
    cy.get('@cardContent').children().eq(2).should('have.text', 'Population: 10,305,564')
    cy.get('@cardContent').children().eq(3).should('have.text', 'Currency: Euro')
    cy.get('@cardContent').children().eq(4).should('have.text', 'Language: Portuguese')

    //check spanish border card
    cy.get('[data-testid="border-card-ES"]').as('spainBorderCard').should('exist')
    cy.get('@spainBorderCard').should('have.attr', 'href', '/countries/ES')
    cy.get('[data-testid="border-card-content-ES"]').as('SpanishBorderCardContent').should('exist');
    cy.get('@SpanishBorderCardContent').children().eq(0).should('have.text', 'Name: Spain')
    cy.get('@SpanishBorderCardContent').children().eq(1).should('have.text', 'Capital: Madrid')
    cy.get('@SpanishBorderCardContent').children().eq(2).should('have.text', 'Population: 47,351,567')
    cy.get('@spainBorderCard').should('have.attr', 'href', '/countries/ES')

    //Spanish main card
    cy.get('@spainBorderCard').click();
    cy.get('[data-testid="ES"]').as('spanishMainCard').should('exist');
    cy.get('@spanishMainCard').should('not.have.attr', 'href', '/countries/ES');
    cy.get('[data-testid="ES-main-card-content"]').as('cardContent').should('exist');
    cy.get('@cardContent').children().eq(0).should('have.text', 'Name: Spain')
    cy.get('@cardContent').children().eq(1).should('have.text', 'Capital: Madrid')
    cy.get('@cardContent').children().eq(2).should('have.text', 'Population: 47,351,567')
    cy.get('@cardContent').children().eq(3).should('have.text', 'Currency: Euro')
    cy.get('@cardContent').children().eq(4).should('have.text', 'Language: Spanish')


    //spanish border cards
    cy.get('[data-testid="border-card-PT"]').should('exist') // Portugal card 
    cy.get('[data-testid="border-card-FR"]').should('exist') // France card
    cy.get('[data-testid="border-card-GI"]').should('exist') // Gibraltar card
    cy.get('[data-testid="border-card-MA"]').should('exist') // Morocco card
    cy.get('[data-testid="border-card-AD"]').should('exist') // Andorra card


    //test home button
    cy.get('[data-testid="home-button"]').should('exist').click()
    cy.url().should('contain', '/');
    cy.get('[data-testid="IE"]').should('exist'); // check we are on main page by checking Ireland is on page
  });

  it('should navigate to the main page and languages page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="languages-button"]').as('languagesButton').should('exist');
    // check portugese main card
    cy.get('@languagesButton').click();
    cy.url().should('contain', '/languages');
    cy.get('[data-testid="languages-button"]').should('not.exist');
    cy.get('[data-testid="language-Albanian"]').as('albanianLanguage').should('exist');
    cy.get('@albanianLanguage').click();
    cy.url().should('contain', '/languages/albanian');
    cy.get('[data-testid="lang-card-AL"]').as('albania').should('exist');
    cy.get('[data-testid="lang-card-XK"]').should('exist');
    cy.get('@albania').click();
    cy.url().should('contain', '/countries/AL');
    cy.get('[data-testid="border-card-content-MK"]').should('exist');
    cy.get('[data-testid="border-card-content-GR"]').should('exist');
    cy.get('[data-testid="border-card-content-XK"]').should('exist');
    cy.get('[data-testid="border-card-content-ME"]').should('exist');
    cy.get('[data-testid="border-card-content-IE"]').should('not.exist');
    cy.get('[data-testid="languages-button"]').should('exist');
    cy.get('[data-testid="home-button"]').as('homeButton').should('exist');
    cy.get('@homeButton').click();
    cy.url().should('contain', '/');
    cy.get('[data-testid="IE"]').should('exist'); // check we are on main page by checking Ireland is on page
  });
});