var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ArticleModel = require('../schemas/articles');

//POST route
router.post('/addArticle', function(req, res, next){
    var picturesArray;
    if(req.body.pictures){
        picturesArray = Object.values(req.body.pictures);
    } else {
        picturesArray = [];
    }

    var articleModel = new ArticleModel({
        title : req.body.title,
        content : req.body.content,
        pictures : picturesArray,
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
    });
});

// GET for list one article
router.get('/getArticles/:id', function (req, res, next) {
    var id = req.params.id;
    ArticleModel.findOne({
        _id : id
    }, function(err, article){
        if(err){
            res.status(501).json({
                status: 'Internal Error'
            });
        }else{
            res.send(article);
        } 
    }); 
}); 

// GET for list all articles
router.get('/getArticles', function (req, res, next) {
        ArticleModel.find({}, function(err, articles){
            if(err){
                res.status(501).json({
                    status: 'Internal Error'
                });
            }else{
                res.send(articles);
            }
        });
  });

  router.put('/updateArticle/:id', function(req, res){
        var id = req.params.id;
        ArticleModel.findById(id, function (err, article){
            if(err){
                res.status(501).json({
                    status: 'Internal Error'
                });
            } else {
                article.title = req.body.title;
                article.content = req.body.content;
                article.pictures = req.body.pictures;

                article.save(function(err, article){
                    if(err){
                        res.status(500).send(err);
                    }
                    res.status(200).json({
                        status: 'Article Edited'
                    });
                });
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
            });
        } else {
            res.status(200).json({
                status: 'row deleted'
            });
        }
    }); 
  }); 
  

module.exports = router;