# Workshop: Cypress.io Handson and Test Isolation

Origin App was forked from [ruslanzharkov/nodejs-shopping-cart](https://github.com/ruslanzharkov/nodejs-shopping-cart)

![cypress_test_isolation](https://user-images.githubusercontent.com/54438809/63830422-add5da80-c99e-11e9-8f7e-c9c012c42170.png)

## Requiments

You need to install Nodejs (v8+) and Docker Desktop or MongoDB.

Command to run MongoDB with docker container:

```
docker run -d -p 27017:27017 --name mongo_cart mongo:4.0.5
```

## Installation Guide

- Clone this project & install dependencies
  ```
  git clone https://github.com/linetwqa/testCorner-Cypress.git
  cd testCorner-Cypress
  npm install && npm install -g npx
  ```
- Seeding initial data:
  ```
  npm run test:seed
  ```
- To start application server
  ```
  npm run start
  ```
- Open localhost:3000 in your browser

- To open Cypress test runner
  ```
  npm run cy:open
  ```
## Testing Folder Structure

- Cypress test cases: /tests/cypress/integration
- Test isolation examples: /tests/cypress/integration/isolation*

## Workshop Sessions

- Cypress test runner and shoppingCart application introduction
- Selector playground: login & checkout form
- API request: login with RESTful API
- Custom command: login & checkout commands
- Test isolation: cy.task, testContext & show intention

## Materials

### E2E Test Tools
![test_isolation](https://user-images.githubusercontent.com/54438809/63830440-b7f7d900-c99e-11e9-8b6a-b8c287a3b31a.png)

### Three Levels of Test Isolation

#### (1) Isolating test cases from themselves

- Each test case is repeatable (run multiple times)
- Run multiple times against the same env
- Easy debuging, don't need to cleanup/restore manually

#### (2) Isolating test cases from each other

- NO dependency between tests and their results
- NOT depends on the running order
- Test against the same entity might impact each other
- Reset database seems to be a solution ❓❓❓
  - Reset data is destructive
  - Prohibit parallel execution
- Provision multiple sets of environment?
  - cost ⬆️ 💸💸💸
  - need to merge test results

#### (3) Isolating the System under test

- Leverage tools like below:
  - In browser mock/stub: Cypress, Polly.js
  - Mock server: WireMock, Talkback, mountebank, ...
  - DockerContainers: isolate run-time dependencies
  - Consumer driven contract testing

![test_isolation](https://user-images.githubusercontent.com/54438809/63830454-c1814100-c99e-11e9-887e-fceae8c82fd3.png)

### Reference

- Official [API & examples](https://docs.cypress.io/api/api/table-of-contents.html) 