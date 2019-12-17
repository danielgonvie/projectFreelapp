const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../../models/User");
const uploader = require('../../configs/cloudinary.config')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.post('/signup', (req, res, next) => {
  const { email, password, picture } = req.body

  if (!email || !password ) {
    res.status(400).json({ message: 'Rellena usuario y contraseña' });
    return;
  }

  if (password.length < 2) {
    res.status(400).json({ message: 'La contraseña debe tener 6 caracteres como mínimo' });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: "Algo ha ido mal. Inténtalo de nuevo por favor." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'El nombre de usuario ya existe. Por favor escoja otro nombre.' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email: email,
      password: hashPass,
      picture,
    });

    newUser.save(err => {
      if (err) {
        res.status(400).json({ message: 'Ups! Algo ha ido mal :(' });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(newUser, (err) => {

        if (err) {
          res.status(500).json({ message: 'Algo no ha ido como se esperaba. Por favor, recarga la página' });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(newUser);
      });
    });
  });
});



router.post('/login', (req, res, next) => {
 
  passport.authenticate('local', (err, theUser, failureDetails) => {
     if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

   if (!theUser) { 
      res.status(401).json(failureDetails);
      return;
    }
 

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post('/login/artist/:true', (req, res, next) => {
 
  passport.authenticate('local', (err, theUser, failureDetails) => {
     if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

   if (!theUser) { 
      res.status(401).json(failureDetails);
      return;
    }
 

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});






router.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

router.post('/upload', uploader.single('picture'), (req, res) => {
  if(req.file){
    res.status(200).json({secure_url: req.file.secure_url })
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = router;
