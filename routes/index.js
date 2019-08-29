var express = require("express");
var router = express.Router();

var Product = require("../models/product");
var Cart = require("../models/cart");
var Order = require("../models/order");

/* GET home page. */
router.get("/", function(req, res, next) {
  const successMgs = req.flash("success")[0];
  const errorMgs = req.flash("error")[0];
  res.render("shop/main", {
    title: "Shopping cart",
    successMgs: successMgs,
    errorMgs: errorMgs,
    noMessage: !successMgs && !errorMgs
  });
});

// query products api
async function allChunkedProducts(req, res) {
  let productChunks = [];
  await Product.find({}, null, { sort: { title: -1 } }, function(err, docs) {
    const chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.send({ products: productChunks });
  });
}

router.get("/prod", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  allChunkedProducts(req, res);
});
// test single doc
router.get("/prod/details", function(req, res, next) {
  Product.find({ title: req.query.t }, null, { sort: { title: -1 } }, function(
    err,
    doc
  ) {
    res.setHeader("Content-Type", "application/json");
    res.send(doc[0]);
  });
});

router.get("/add-to-cart/:id", function(req, res) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/");
    }
    if (product && product.stock < 1) {
      req.flash("error", "Sorry, short of inventory now!");
      return res.redirect("/");
    }
    if (!!product) cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect("/");
  });
});

router.get("/reduce/:id", function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/remove/:id", function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/shopping-cart", function(req, res, next) {
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", { products: null });
  }
  var cart = new Cart(req.session.cart);
  return res.render("shop/shopping-cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

router.get("/checkout", isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash("error")[0];
  return res.render("shop/checkout", {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});

router.post("/checkout", isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  var cart = new Cart(req.session.cart);
  /* disable for testing not related functions
    var stripe = require("stripe")(
        "sk_test_whatever_your_token_is"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if(err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }*/
  var order = new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name,
    paymentId: "test_﻿1E5V6XJUTW01mQPJQj6MHkkk" /*charge.id*/
  });
  order.save(function(err, result) {
    updateProductStock(cart);
    req.flash("success", "Successfully bought product!");
    req.session.cart = null;
    res.redirect("/");
  });
  /*});*/
});

module.exports = router;
module.exports.allChunkedProducts = allChunkedProducts;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect("/user/signin");
}

function updateProductStock(myCart) {
  Object.values(myCart.items).forEach(entry => {
    Product.findByIdAndUpdate(
      entry.item._id,
      { $inc: { stock: -entry.qty } },
      { safe: true, upsert: false, new: false }
    ).catch(err => {
      console.error("Checkout - error update product: " + err.message);
      throw err;
    });
  });
}
