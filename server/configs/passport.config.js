const User = require("../models/User");
const Artist = require("../models/Artist");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

passport.serializeUser((user, next) => {
  console.log("En el serialize");
  next(null, user);
});

passport.deserializeUser((user, next) => {
  if (user.hasOwnProperty("category")) {
    Artist.findById(user.id) 
            .then(user => {
                next(null, user)
            })
            .catch(next)
          } else {
            User.findById(user.id)
            .then(user => {
                next(null, user)
            })
            .catch(next)

          }
});

passport.use(new LocalStrategy(
      {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
      },
      (req, email, password, next, ) => {
          if (req.params.true) {
              Artist.findOne({ email }, (err, foundUser) => {
                  if (err) {
                      next(err);
                      return;
                  }
                  if (!foundUser) {
                      next(null, false, { message: 'Usuario no registrado.' });
                      return;
                  }
                  if (!bcrypt.compareSync(password, foundUser.password)) {
                      next(null, false, { message: 'Contraseña incorrecta.' });
                      return;
                  }
              })
              .then(user => {
                  next(null, user)
              })
              .catch(next)
          }
          else {
              User.findOne({ email }, (err, foundUser) => {
                  if (err) {
                      next(err);
                      return;
                  }
                  if (!foundUser) {
                      next(null, false, { message: 'Usuario no registrado.' });
                      return;
                  }
                  if (!bcrypt.compareSync(password, foundUser.password)) {
                      next(null, false, { message: 'Contraseña incorrecta.' });
                      return;
                  }
                  next(null, foundUser);
              });
          }
      }));
