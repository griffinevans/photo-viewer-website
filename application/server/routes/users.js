var express = require('express');
var router = express.Router();
const db = require('../database.js');
const bcrypt = require('bcrypt');

router.post('/login', (req,res,next) => {
  const {username, password} = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query('select id, username, password from users where username=?', [username,])
    .then( ([results, fields]) => {
      if(results && results.length == 1) {
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password,dbPassword);
      }else{
        throw new Error('Invalid user credentials');
      }
    })
    .then( (passwordsMatched) => {
      if(passwordsMatched) {
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        res.redirect('/');
      }else{
        throw new Error('Invalid user credentials');
      }
    })
    .catch( (err) => {
      next(err);
    })
});

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
        return bcrypt.hash(password,2);
      } else {
        throw new Error('email already exists');
      }
    })
    .then( (hashedPassword) => {
      return db.execute('insert into users (username, email,' 
        + 'password) value (?,?,?)',[username, email, hashedPassword]);
    })
    .then( ([results,fields]) =>  {
      if (results && results.affectedRows == 1) {
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

router.delete('/login');

module.exports = router;
