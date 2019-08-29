import ShortUniqueId from 'short-unique-id'

class Product {
  constructor(name) {
    (this.title = `${name}_${new ShortUniqueId().randomUUID(6)}`),
      (this.description = `Test description for ${
        this.title
      } product! rlVyLUWQr9EU2oO3SZKe-ihpfDrsokUb8nwVmeUU7-oS2S9kzBGw
    wQz1I8eVJa_7Z59YwC6gtHtaHjAiKr5=rlVyLUWQr9EU2oO3SZKe-ihpfDrsokUb8nwVmeUU7-oS2S9kzBGwwQz1I8eVJa_7Z59YwC6gtHtaHjAiKr5`),
      (this.imagePath = 'images/test_the_test.png'),
      (this.price = 22),
      (this.stock = 50)
  }

  static createProdct(name) {
    return new this(name)
  }
}

class TestContext {
  constructor() {
    (this.products = []),
      // for user
      (this.userName = 'defaultUser'),
      (this.userEmail = 'cypress_test@gmail.com'),
      (this.userPassword = 'test12345')
  }
}

export default { TestContext, Product }
