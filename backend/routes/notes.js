var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var cors = require('cors');

router.get('/',  function(req, res){
  req.app.locals.con.connect( function(err){
    if(err){
      console.log(err)
    }

    let notes = `SELECT * FROM notes`

    req.app.locals.con.query(notes, function(err, result){
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

    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let formattedContent = content.replace(/"/g, '\\"');
    let author = req.body.author;

    let sql = `INSERT INTO notes (title, description, content, author) VALUES ("${title}", "${description}", "${formattedContent}", "${author}")`

    req.app.locals.con.query(sql, function(err, result){
      if(err){
        console.log(err)
      }
      console.log('user:', result);
      res.send({message: result})
    })
  })
})

router.put('/edit', function(req, res){
  req.app.locals.con.connect(function(err){
    if(err){
      console.log(err)
    }

    let id = req.body.id
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let formattedContent = content.replace(/"/g, '\\"');
    let author = req.body.author;


    let sql = `UPDATE notes SET title = "${title}", description = "${description}", content = "${formattedContent}", author="${author}" WHERE id="${id}"`

    req.app.locals.con.query(sql, function(err, result){
      
      if(err){
        console.log(err)
      }
      console.log('result', result);
      res.send({message: result})
    })
  })
})

router.put('/delete', function(req, res){
  req.app.locals.con.connect(function(err){
    if(err){
      console.log(err)
    }

    let sql = `UPDATE notes SET isdeleted = "1" WHERE id="${req.body.id}"`

    req.app.locals.con.query(sql, function(err, result){
      
      if(err){
        console.log(err)
      }
      console.log('result', result);
      res.send({message: result})
    })
  })
})


module.exports = router;