/// <reference types="Cypress" />

context('Stub Response Data', () => {
  it('cy.route() - route responses to matching requests', () => {
    // https://on.cypress.io/route
    cy.server()
    cy.fixture('example.json').as('fakeResp')

    // Stub a response to GET /prod
    cy.route({
      method: 'GET',
      url: '/prod',
      response: '@fakeResp'
    }).as('getProdList')

    cy.visit('/')
    cy.wait('@getProdList')
    // UI displayed correctly according api response
    cy.get('div.price').should('have.length', 6)
    // linkage attributes are correctly set
    cy.get('a.cart')
      .first()
      .invoke('attr', 'href')
      .should('contain', '5c4a83c471d09c3125654816')
  })
})
