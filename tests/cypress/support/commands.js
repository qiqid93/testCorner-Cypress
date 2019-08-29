// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import './test-context'

Cypress.Commands.add('doLogin', testContext => {
  // this command is used to demo test intention purpose!
  if (testContext.userPassword === 'GoodPassword') {
    cy.loginByForm(testContext.userEmail, 'test12345')
  }
})

Cypress.Commands.add('loginByForm', (email, password) => {
  Cypress.log({
    name: 'loginByForm',
    message: email + ' | ' + '******'
  })

  cy.request('/user/signin')
    .its('body')
    .then(body => {
      // we can use Cypress.$ to parse the string body
      // thus enabling us to query into it easily
      const $html = Cypress.$(body)
      const csrf = $html.find('input[name=_csrf]').val()
      return cy
        .request({
          method: 'POST',
          url: '/user/signin',
          form: true,
          followRedirect: false,
          body: {
            email: email,
            password: password,
            _csrf: csrf
          }
        })
        .then(resp => {
          expect(resp.status).to.eq(302)
        })
    })
  // assertion
  // cy.visit('/user/profile')
  // cy.get('h1').should('contain', 'User Profile')
})
//
// -- Checkout command --
Cypress.Commands.add('checkout', name => {
  Cypress.log({
    name: 'checkout',
    message: `CustomerName ${name}`
  })
  cy.visit('/checkout')
  cy.get('#name', { log: false }).type(name, { log: false })
  cy.get('#address', { log: false }).type('No.24, Wall St., NY City', {
    log: false
  })
  cy.get('#card-holder', { log: false }).type(name, { log: false })
  cy.get('#card-number', { log: false }).type('4242 4242 4242 4242', {
    log: false
  })
  cy.get('#card-expiry-month', { log: false }).type('05', { log: false })
  cy.get('#card-expiry-year', { log: false }).type('23', { log: false })
  cy.get('#card-cvc', { log: false }).type('333', { log: false })
  cy.contains('button', 'Buy').click()
})
//
// -- Add Cart item command --
Cypress.Commands.add('addItemToCart', name => {
  Cypress.log({
    name: 'add to cart: ',
    message: `PrductName is ${name}`
  })
  cy.task(
    'findDocuments',
    {
      collectionName: 'products',
      filter: { title: name }
    },
    { log: false }
  ).then(items => {
    cy.request(`/add-to-cart/${items[0]._id}`)
  })
})
