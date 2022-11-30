var express = require('express');
var router = express.Router();
const db = require('../database.js');

router.post("/register", (req,res,next) => {
  const {username, email, password} = req.body;
  db.query('select id from users where username=?',[username])
  .then( ([results,fields]) =>  res.json(results))
  .catch( (err) => next(err));
  console.log(req.body);
  res.send();
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send();
});

module.exports = router;
