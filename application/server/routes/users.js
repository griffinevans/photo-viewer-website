var express = require('express');
var router = express.Router();
const db = require('../database.js');

router.post("/register", (req,res) => {
  const {username, email, password} = req.body;
  db.query('select id from user where username=?',[username]);
  console.log(req.body);
  res.send();
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send();
});

module.exports = router;
