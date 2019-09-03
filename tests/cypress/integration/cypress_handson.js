/// <reference types="Cypress" />
describe('Given a valid user is inserted in DB', () => {
  context('When I logged in as the user', () => {
    it('Then I should be redirected to /profile page', () => {
      cy.server()
      cy.route('/prod').as('prodPage')
      cy.visit('/user/signin')
      cy.get('input#email').type('cypress_test@gmail.com')
      cy.get('input#password').type('test12345')
      cy.get('button.btn').click()
      // assertion
      cy.url().should('contain', '/user/profile')
      // buy an item
      cy.visit('/')
      cy.contains('div', 'Journey')
        .find('a.cart').click()
      cy.visit('/checkout')
      cy.get('input#name').type('cypress_test')
      cy.get('input#address').type('No. 24, wall St., NY.')
      cy.get('input#card-holder').type('cypress_test')
      cy.get('input#card-number').type('4242 4242 4242 4242')
      cy.get('input#card-expiry-month').type('05')
      cy.get('input#card-expiry-year').type('23')
      cy.get('input#card-cvc').type('333')
      cy.get('button.btn').click()
      //
      cy.wait('@prodPage')
      cy.get('div#success').should('contain','Successfully bought')
    })
  })
})