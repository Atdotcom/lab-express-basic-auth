const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

 const User = require('../models/User.model');
//const app = require('../app');

//singUp

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.post('/signup', (req, res) => {
  console.log(req.body)

  const { username, password } = req.body;

  bcryptjs.hash(password, saltRounds)
  .then(hash => {
    return User.create({ username, passwordHash: hash})
  })
  .then((newUser) => 
    res.redirect(`/auth/profile/${newUser.username}`))
    .catch(err => console.log(err))
})

//Login

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', (req, res) => {
  console.log(req.body)
})


// Profile

router.get('/profile', (req, res) => {
  res.render('auth/profile')
})

module.exports = router;
