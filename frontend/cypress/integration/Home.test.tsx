/// <reference types="cypress" />

describe('Search input and results', () => {
  let searchText = '';
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    searchText = 'exegg';
    cy.get('input[name="searchInput"]').type(searchText);
  });

  it('search field reacts to user input', () => {
    cy.get('input[name="searchInput"]').should('have.value', searchText);
  });

  it('search results show text and image of pokemon', () => {
    cy.get('p').contains(searchText);
    cy.get('p')
      .contains(searchText)
      .find('img')
      .should('have.attr', 'alt')
      .should('include', searchText);
  });

  it('search input filters pokemon according to name', () => {
    /* 
      Test assumes there are only 2 pokemons with string 'exegg' in name,
      and only 1 named 'exeggutor'. 
    */
    cy.get('p').filter(`:contains(${searchText})`).should('have.length', 2);
    searchText = 'utor';
    cy.get('input[name="searchInput"]').type(searchText);
    cy.get('p').filter(`:contains(${searchText})`).should('have.length', 1);
  });
});
