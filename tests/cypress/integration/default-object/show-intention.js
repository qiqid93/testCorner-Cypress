/// <reference types="Cypress" />
import { TestContext, Product } from '../../support/test-context'

context('Test purchasing when short of inventory', () => {
  let testContext = new TestContext()
  let outOfStock = new Product('No Enough Inventory')

  outOfStock.stock = 0 // <== clearly shows what you want to TEST!
  testContext.products.push(outOfStock)

  testContext.userName = 'ValidUser' // <== shows the important variation of this test case!
  testContext.userPassword = 'GoodPassword'

  before(function() {
    cy.task('createDocument', {
      config: Cypress.config(),
      collectionName: 'products',
      filter: outOfStock
    })
  })

  after(function() {
    // since create diff product each run, you can leave it or not, it depends~
    cy.task('deleteDocuments', {
      config: Cypress.config(),
      collectionName: 'products',
      filter: outOfStock
    })
  })

  beforeEach(function() {
    // login before each test
    cy.doLogin(testContext)
    cy.server()
    cy.route('GET', '/prod').as('prodPage')
  })

  it('add to cart should shows error message', function() {
    // buy a game
    cy.visit('/')
    cy.contains('div', testContext.products[0].title)
      .find('a.cart')
      .click()
    // checkout
    // cy.checkout(testContext.userName)
    // wait process & do assertion
    cy.wait('@prodPage')
    cy.get('div#success').contains('short of inventory')
  })
})
