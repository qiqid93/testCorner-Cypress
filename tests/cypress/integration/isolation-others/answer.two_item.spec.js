/// <reference types="Cypress" />
import { TestContext, Product } from '../../support/test-context'

describe('Given all products have sufficient inventory', () => {
  context('When user purchase TWO item', () => {
    const firstProduct = new Product('Test Product NO1')
    const secondProduct = new Product('Test Product NO2')
    let testContext = new TestContext()
    secondProduct.stock = 25
    testContext.products.push(firstProduct)
    testContext.products.push(secondProduct)

    before(function() {
      testContext.products.forEach(prod => {
        cy.task('createDocument', { config: Cypress.config(), collectionName: 'products', filter: prod })
      })
    })

    after(function() {
      // since create diff product each run, you can leave it or not, it depends~
      cy.task('deleteDocuments', {
        config: Cypress.config(),
        collectionName: 'products',
        filter: {
          title: {
            $in: testContext.products.map(function(prod) {
              return prod.title
            })
          }
        }
      })
    })

    beforeEach(function() {
      // login before each test
      cy.loginByForm('cypress_test@gmail.com', 'test12345')
      cy.server()
      cy.route('GET', '/prod').as('prodPage')
    })

    it('can checkout all items successfully', function() {
      // buy a game
      cy.visit('/')
      cy.contains('div', testContext.products[0].title, { timeout: 10000 })
        .find('a.cart')
        .click()
      // buy 2nd one
      cy.contains('div', testContext.products[1].title, { timeout: 10000 })
        .find('a.cart')
        .click()
      // checkout
      cy.checkout(testContext.userName)
      // wait process & do assertion
      cy.wait('@prodPage')
      cy.get('div#success').contains('Successfully bought')
      cy.contains('div', testContext.products[0].title, { timeout: 10000 })
        .find('div.stock')
        .should($div => {
          const text = $div.text()
          expect(text).to.eq('Stock: 49')
        })
      cy.contains('div', testContext.products[1].title, { timeout: 10000 })
        .find('div.stock')
        .should($div => {
          const text = $div.text()
          expect(text).to.eq('Stock: 24')
        })
    })
  })
})
