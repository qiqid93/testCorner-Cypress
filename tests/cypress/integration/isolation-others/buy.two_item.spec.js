/// <reference types="Cypress" />
describe('Given all products have sufficient inventory', () => {
  context('When user purchase TWO item', () => {
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

    it('can checkout all items successfully', function() {
      // buy a game
      cy.visit('/')
      // buy one
      cy.contains('div', 'Inversion')
        .find('a.cart')
        .click()
      // buy 2nd one
      cy.contains('div', 'Borderlands')
        .find('a.cart')
        .click()
      cy.visit('/shopping-cart')
      // checkout
      cy.checkout('QA5')
      // wait process & do assertion
      cy.wait('@prodPage')
      cy.get('div#success').contains('Successfully bought')
      cy.contains('div', 'Inversion')
        .find('div.stock')
        .should($div => {
          const text = $div.text()
          expect(text, 'product [stock]').to.eq('Stock: 4')
        })
      cy.contains('div', 'Borderlands')
        .find('div.stock')
        .should($div => {
          const text = $div.text()
          expect(text, 'product [stock]').to.eq('Stock: 4')
        })
    })
  })
})
