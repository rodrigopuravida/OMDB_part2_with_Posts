var express = require('express');
var router = express.Router();
var db = require('../models');

// GET http://localhost:3000/favorites
router.get('/',function(req,res){
  db.favorite.findAll({
    include:[db.comment]
  }).then(function(favorites){
    res.render('favorites/index',{favorites:favorites});
  });
});

// POST http://localhost:3000/favorites
router.post('/',function(req,res){
  // res.send(req.body)
  db.favorite.create({
    title:req.body.title,
    year:req.body.year,
    poster:req.body.poster,
    imdbId:req.body.imdbId
  }).then(function(movie){
    res.redirect('/movies/'+movie.imdbId);
  });
});

// DELETE http://localhost:3000/favorites/:id
router.delete('/:id',function(req,res){
  db.favorite.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/favorites');
  })
});


// GET http://localhost:3000/favorites/:id/comments
router.get('/:id/comments',function(req,res){
  // res.send(req.params);
  db.favorite.find({
    where:{id:req.params.id},
    include:[db.comment]
  }).then(function(favorite){
    res.render('comments/index',{
      favorite:favorite
    });
  });
});

router.post('/:id/comments',function(req,res){
  db.favorite.findById(req.params.id).then(function(favorite){
    favorite.createComment({body:req.body.body}).then(function(comment){
      res.redirect('/favorites/' + favorite.id + '/comments');
    });
  });
  // res.send({params:req.params,body:req.body});
});


module.exports = router;






