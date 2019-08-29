/* eslint-disable no-console */
const Product = require('../models/product')
const mongoose = require('mongoose')
const config = require("../config/config")

mongoose.Promise = global.Promise
mongoose.connect(`${global.gConfig.DATABASE_URL}/${global.gConfig.DATABASE_NAME}`, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
})

const products = [
  new Product({
    imagePath:
      'https://images-na.ssl-images-amazon.com/images/I/81QEVB22XDL._SY445_.jpg',
    title: 'Plants vs. Zombies: Garden Warfare',
    description:
      'Plants vs. Zombies: Garden Warfare is a multiplayer third-person shooter and tower defense video game. It is the third game in the Plants vs. Zombies series, developed by PopCap Games and published by Electronic Arts. The game was ' +
      'released on Microsoft Windows, PlayStation 3, PlayStation 4, Xbox 360 and Xbox One. The game features co-op along ' +
      'with competitive multiplayer modes, where players can control the plants as well as the zombies.',
    price: 15,
    stock: 5
  }),
  new Product({
    imagePath:
      'https://upload.wikimedia.org/wikipedia/en/b/b2/Ori_and_the_Blind_Forest_Logo.jpg',
    title: 'Ori and the Blind Forest',
    description:
      'Ori and the Blind Forest is a platform-adventure Metroidvania video game developed by Moon Studios and published by Microsoft Studios. The game was released for Microsoft Windows and Xbox One on March 2015.In the game, players ' +
      'assume control of Ori, a white guardian spirit, and Sein, the "light and eyes" of the Forest\'s Spirit Tree',
    price: 28,
    stock: 5
  }),
  new Product({
    imagePath:
      'https://images-na.ssl-images-amazon.com/images/I/41UKb6xuyfL.jpg',
    title: 'Journey',
    description:
      'In Journey, the player controls a robed figure in a vast desert, traveling towards a mountain in the distance. Other players on the same journey can be discovered, and two players can meet and assist each other, but they cannot communicate ' +
      "via speech or text and cannot see each other's names until after the game's credits.",
    price: 15,
    stock: 5
  }),
  new Product({
    imagePath:
      'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Inversion_coverart.jpg/220px-Inversion_coverart.jpg',
    title: 'Inversion',
    description:
      'It was released on June 5, 2012 in North America, July 12, 2012 in Australia and on July 13, 2012 in Europe for PlayStation 3 and Xbox 360. It was later released for Microsoft Windows on June 8, 2012 in Europe, July 12, 2012 in Australia and ' +
      'July 26, 2012 in North America. It features gravity manipulation and destructible environments',
    price: 18,
    stock: 5
  }),
  new Product({
    imagePath:
      'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/DarksidersII.jpg/220px-DarksidersII.jpg',
    title: 'Darksiders II',
    description:
      "Darksiders II is an action role-playing[2][3] hack and slash video game developed by Vigil Games and published by THQ. It is the sequel to Darksiders and was released in August 2012 for Microsoft Windows, PlayStation 3, Xbox 360[4] and as a launch title for Wii U upon the console's Australian, European, and North " +
      'American release in November 2012. An enhanced version, titled Darksiders II The Deathinitive Edition',
    price: 20,
    stock: 5
  }),
  new Product({
    imagePath:
      'https://upload.wikimedia.org/wikipedia/ru/a/a6/Borderlands2.jpg',
    title: 'Borderlands 2',
    description:
      "Borderlands 2 is an open world action role-playing first-person shooter video game developed by Gearbox Software and published by 2K Games.[4] It is the second game in the Borderlands series and the sequel to 2009's Borderlands. The game was released for Microsoft Windows, PlayStation 3, Xbox 360, and OS X on September 18, 2012. " +
      'It was ported to the PlayStation Vita on May 13, 2014, and released for Linux on September 30, 2014.[1]',
    price: 30,
    stock: 5
  })
]

function exit() {
  console.log('Seeding products collection done!')
  mongoose.disconnect()
}

// drop collections first
Product.deleteMany({}, function(err) {
  if (err) {
    console.log('Error')
  }
})

var done = 0
for (var i = 0; i < products.length; i++) {
  // eslint-disable-next-line no-unused-vars
  products[i].save(function(err, result) {
    done++
    if (done == products.length) exit()
  })
}
