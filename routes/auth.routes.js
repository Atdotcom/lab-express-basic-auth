const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;

 const User = require('../models/User.model');
//const app = require('../app');

//singUp

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});
//  POST Signup page
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    User.create({username, password: passwordHash})
        .then(newUser => res.redirect(`/auth/profile/${newUser.username}`))
        .catch(err => console.log(err))
})
// router.get('/signup', (req, res) => {
//   res.render('auth/signup')
// })

// router.post('/signup', (req, res) => {
//   console.log(req.body)

//   const { username, password } = req.body;

//   bcryptjs.hash(password, saltRounds)
//   .then(hash => {
//     return User.create({ username, passwordHash: hash})
//   })
  
//   .then((newUser) => 
//     res.redirect(`/auth/profile/${newUser.username}`))
//     .catch(err => console.log(err))
// })


//Login

router.get('/login', (req, res) => {
  console.log('SESSION =====> ', req.session);
  res.render('auth/login')
})

router.post('/login', (req, res) => {
  console.log('SESSION =====>', req.session);
 const { username, password} = req.body;

 if (username === '' || password === ''){
  res.render('auth/login', {
    errorMessage: 'Please enter both, username and password to login'
  });
  return;
 }

 User.findOne({ username })
 .then(user => {
console.log('user', user)
  if(!user){
    res.render('auth/login', { errorMessage: 'Email is not register. Try with other Email'});
    return;
  } else if(bcrypt.compareSync(username, user.password)){
    const { username, password } = user;
    req.session.currentUser = { username, password };
    req.redirect('/auth/profile')
  }
    //  // Compare the user input with my hash password
    //    return bcryptjs.compare(password, foundUser.passwordHash)
    //          .then(result => {
    //              // if result === true -> redirect to the profile route
    //              if(result){
    //                  res.redirect(`/auth/profile/${foundUser.username}`)
    //              }
    //              // else -> communicate to the user that they entered something wrong
                 else {
                     res.render('auth/login', { errorMessage: 'Incorrect password, try again' })
                 }      
 })
 .catch(err => console.log(err))
})

// Profile

router.get('/profile', (req, res) => {
  console.log('currentUser:', req.session.currentUser);
  const {currentUser} = req.session;

  if(currentUser) {
    res.render('auth/profile', currentUser)
  }
  else {
    res.render('auth/profile')
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/');
  });
});
// router.get('/profile/:username', (req, res) => {
//   const { username } = req.params;
//   User.findOne({ username })
//   .then(foundUser => res.render('auth/profile',  foundUser ))
//   .catch(err => console.log(err));
// })



module.exports = router;
