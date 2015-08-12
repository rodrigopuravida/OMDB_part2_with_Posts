var express = require('express');
var router = express.Router();
var db = require('../models');

// GET http://localhost:3000/favorites
router.get('/',function(req,res){

  console.log('I am at favorites / index');

  db.favorite.findAll({
    include:[db.comment]
  }).then(function(favorites){
    res.render('favorites/index',{favorites:favorites});
  });
});

// GET http://localhost:3000/favorites/tags
router.get('/tags',function(req,res){
  db.tag.findAll({
  }).then(function(tags){
    res.render('tags/index',{tags:tags});
  });
});



// GET http://localhost:3000/favorites/:id -RENDER FAVORITES BASED ON TAGS
router.get('/:id',function(req,res){

  // console.log('I am at favorites / for filtering based on tag');
  // tagId = req.params.id;
  // // res.send({params:req.params.id});
  // db.posttag.find({
  //   where:{tagId:tagId}).then(function(posttag)
  //   {db.favorite.find({id: posttag.favoriteId}).then(function(favorite))
  //       res.render('favorites/index',{favorites:favorite});
  // });
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


router.get('/:id/tags/new', function(req, res) {
  res.render('tags/new', {favoriteId: req.params.id});
});

router.post('/:id/tags', function(req, res) {
  // res.send("The tag name: " + req.body.tagName + "<br>The favorite id: " + req.params.id);
  var tagName = req.body.tagName;
  var favoriteId = req.params.id;

  db.favorite.findById(favoriteId).then(function(favorite) {
    db.tag.findOrCreate({where: {tag: tagName}}).spread(function(tag, created) {
      favorite.addTag(tag).then(function() {

            res.redirect('/favorites');

      })
    });
  });
});


// GET http://localhost:3000/favorites/tags
router.get('/tags',function(req,res){
  db.tag.findAll({
  }).then(function(tags){
    res.render('tags/index',{tags:tags});
  });
});


module.exports = router;






