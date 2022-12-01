var express = require('express');
var router = express.Router();
const db = require('../database.js');


router.post("/register", (req,res,next) => {
  const {username, email, password} = req.body;
  db.query('select id from users where username=?',[username])
    .then( ([results,fields]) =>  {
      if (results && results.length == 0) {
        return db.query('select id from users where email=?',[email]);
      } else {
        throw new Error('username already exists');
      }
    })
    .then( ([results,fields]) =>  {
      if (results && results.length == 0) {
        return db.execute('insert into users (username, email, password) value (?,?,?)',[username, email, password]);
      } else {
        throw new Error('email already exists');
      }
    })
    .then( ([results,fields]) =>  {
      if (results && results.length == 1) {
        res.redirect('/login');
      } else {
        throw new Error('user could not be made');
      }
    })
    .catch( (err) => {
      res.redirect('/register');
      next(err);
    });
  console.log(req.body);
  //res.send();
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send();
});

module.exports = router;
