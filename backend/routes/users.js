var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var cors = require('cors');

router.get('/',  function(req, res){
  req.app.locals.con.connect( function(err){
    if(err){
      console.log(err)
    }

    let users = `SELECT * FROM users`

    req.app.locals.con.query(users, function(err, result){
      if(err){
        console.log(err)
      }
      console.log(result)
      res.send(result);
    })
  })
})

router.post('/add', function(req, res){
  req.app.locals.con.connect(function(err){
    if(err){
      console.log(err)
    }
    console.log(req.body)

    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    let sql = `INSERT INTO users (email, password, username) VALUES ("${email}", "${password}", "${username}")`

    req.app.locals.con.query(sql, function(err, result){
      if(err){
        console.log(err)
      }
      console.log('user:', result);
      res.send({message: result})
    })
  })
})

module.exports = router;
