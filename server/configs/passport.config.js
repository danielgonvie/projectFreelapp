const User = require("../models/User");
const Artist = require("../models/Artist");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

passport.serializeUser((user, next) => {
  console.log("En el serialize");
  console.log(user.id);
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  console.log("Deserialiceando"),
    User.findById(id, (err, user) => {
      if (err) next(err);
      if (user) {
        next(null, user);
      } else {
        Artist.findById(id, (err, user) => {
          if (err) next(err);
          next(null, user);
        });
      }
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, next) => {
      User.findOne({ email }, (err, foundUser) => {
        if (foundUser === null) {
          Artist.findOne({ email }, (err, foundUser) => {
            if (!bcrypt.compareSync(password, foundUser.password)) {
              next(null, false, {
                message: "Usuario o contraseña incorrectos."
              });
              return;
            }

            next(null, foundUser);
          });
        }

        if (foundUser !== null) {
          if (!bcrypt.compareSync(password, foundUser.password)) {
            next(null, false, { message: "Usuario o contraseña incorrectos." });
            return;
          }
        }

        next(null, foundUser);
      });
    }
  )
);
