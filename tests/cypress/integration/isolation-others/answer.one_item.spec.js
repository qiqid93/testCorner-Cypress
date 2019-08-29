/// <reference types="Cypress" />
import { TestContext, Product } from '../../support/test-context'

describe('Given all products have sufficient inventory', () => {
  context('When user purchase ONE item', () => {
    const firstProduct = new Product('Test Product NO1')
    let testContext = new TestContext()
    testContext.products.push(firstProduct)

    before(function() {
      cy.task('createDocument', {
        config: Cypress.config(),
        collectionName: 'products',
        filter: firstProduct
      })
    })

    after(function() {
      // since create diff product each run, you can leave it or not, it depends~
      cy.task('deleteDocuments', {
        config: Cypress.config(),
        collectionName: 'products',
        filter: { title: firstProduct.title }
      })
    })

    beforeEach(function() {
      // login before each test
      cy.loginByForm('cypress_test@gmail.com', 'test12345')
      cy.server()
      cy.route('GET', '/prod').as('prodPage')
    })

    it('can checkout one purchase successfully', function() {
      // buy a game
      cy.visit('/')
      cy.contains('div', testContext.products[0].title, { timeout: 10000 })
        .find('a.cart')
        .click()
      // checkout
      cy.checkout(testContext.userName)
      // wait process & do assertion
      cy.wait('@prodPage')
      cy.get('div#success').contains('Successfully bought')
      cy.contains('div', testContext.products[0].title, { timeout: 10000 })
        .find('div.stock')
        .should('contain', 'Stock: 49')
    })
  })
})
