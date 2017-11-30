var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ArticleModel = require('../schemas/articles');



/* router.all('/*', function(req, resp, next){

    console.log('he caido aca');
    next();
});  */

//POST route
router.post('/addArticle', function(req, res, next){

    var articleModel = new ArticleModel({
        title : req.body.title,
        content : req.body.content,
        pictures : req.body.pictures,
        date : req.body.date
    });
    
    articleModel.save(function(err, data){
        if(err){
            res.status(501).json({
                status: 'Internal Error'
            });
        } else {
            res.status(200).json({
                status: 'Article Saved'
            });
        }
    })
    
});


// GET for list all articles
router.get('/getArticles', function (req, res, next) {
        ArticleModel.find({}, function(err, articles){
            if(err){
                res.status(501).json({
                    status: 'Internal Error'
                })
            }else{
                res.send(articles);
            }
        });
  });


 router.delete('/deleteArticle/:id', function(req, res) {
     var id = req.params.id;
    ArticleModel.remove({
        _id : id
    }, function(err, result){
        if(err){
            res.status(501).json({
                msg: 'database internal error'
            })
        } else {
            res.status(200).json({
                status: 'row deleted'
            });
        }
    }); 
  }); 
  

module.exports = router;