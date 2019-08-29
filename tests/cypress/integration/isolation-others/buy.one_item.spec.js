/// <reference types="Cypress" />

describe('Given all products have sufficient inventory', () => {
  context('When user purchase ONE item', () => {
    beforeEach(function() {
      /*
       *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       *  ! re-seed DB to restore testing data each time!
       *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       */
      cy.exec('node ../seed/product-seeder')
      // login before each test
      cy.loginByForm('cypress_test@gmail.com', 'test12345')
      cy.server()
      cy.route('GET', '/prod').as('prodPage')
    })

    it('can checkout one purchase successfully', function() {
      // buy a game
      cy.visit('/')
      cy.contains('div', 'Inversion')
        .find('a.cart')
        .click()
      // checkout
      cy.checkout('QA5')
      // wait process & do assertion
      cy.wait('@prodPage')
      cy.get('div#success').contains('Successfully bought')
      cy.contains('div', 'Inversion')
        .find('div.stock')
        .should('contain', 'Stock: 4')
    })
  })
})
