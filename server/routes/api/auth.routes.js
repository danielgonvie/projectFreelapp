const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../../models/User");
const Artist = require("../../models/Artist");
const Calendar = require("../../models/Calendar");
const Portfolio = require("../../models/Portfolio");
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

router.post('/signup/artist/:true', (req, res, next) => {
  const { email, password, picture } = req.body
  const name = req.body.name;
      const alias= req.body.alias;
      const toggleAlias= req.body.toggleAlias;
    const location=req.body.location;
    const category= req.body.category;
    const subcategory= req.body.subcategory;
    const availability= req.body.availability;
    const contactEmail= req.body.contactEmail;
    const contactPhone= req.body.contactPhone;
    const social= req.body.social;

  if (!email || !password ) {
    res.status(400).json({ message: 'Rellena usuario y contraseña' });
    return;
  }

  if (password.length < 2) {
    res.status(400).json({ message: 'La contraseña debe tener 6 caracteres como mínimo' });
    return;
  }

  Artist.findOne({ email }, (err, foundUser) => {

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

    const newCalendar = new Calendar({
      resources: [{id:"r1", name: "Jobs"}],
      events: [{
        id: 0,
        title: "Cuenta creada",
        allDay: true,
        start: Date.now,
        end: Date.now,
      }]

    });

    const newPortfolio = new Portfolio ({
      description: "",
      gallery: {
        imageDesc: "",
        images: [],
        videoDesc: "",
        videos: [],
        songDesc: "",
        songs: []
      }
    });

    const newUser = new Artist({
      email: email,
      password: hashPass,
      picture,
      name: name,
      alias: alias,
      toggleAlias: toggleAlias,
    location: location,
    category: category,
    subcategory: subcategory,
    availability: availability,
    contactEmail: contactEmail,
    contactPhone: contactPhone,
    social: social,
    calendar: null,
    portfolio: null,
    });

    let calendarId = null

    newCalendar.save().then(calendar => {
      calendarId = calendar._id
      return newPortfolio.save()
    }).then(portfolio => {
      newUser.calendar=calendarId;
      newUser.portfolio = portfolio._id;
      newUser.save(err => {
        if (err) {
          res.status(400).json({ message: 'Ups! Algo ha ido mal :(' });
          return;
        }
    })

    

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
