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

    it('Then he can checkout purchased item successfully', function() {
      // buy a game
      cy.visit('/')
      cy.contains('div', 'Journey')
        .find('a.cart')
        .click()
      // checkout
      cy.checkout('QA5')
      // wait process & do assertion
      cy.wait('@prodPage')
      cy.get('div#success').should('contain', 'Successfully bought')//.contains('Successfully bought')
      cy.contains('div', 'Journey')
        .find('div.stock')
        .should('contain', 'Stock: 4')
    })
  })
})
