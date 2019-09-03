/// <reference types="Cypress" />
describe('Given a valid user is inserted in DB', () => {
  context('When I logged in as the user', () => {
    it('Then I should be redirected to /profile page', () => {
      cy.visit('/user/signin')
      cy.get('input#email').type('cypress_test@gmail.com')
      cy.get('input#password').type('test12345')
      cy.get('button.btn').click()
      // assertion
      cy.url().should('contain', '/user/profile')
    })
  })
})