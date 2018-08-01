var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var NewsModel = require('../schemas/news');

//POST route
router.post('/addArticle', function(req, res, next){

    
    var picturesArray;

    if(req.body.pictures){
        picturesArray = Object.values(req.body.pictures);
    } else {
        picturesArray = [];
    }

    var newModel = new NewsModel({
        title : req.body.title,
        content : req.body.content,
        pictures : picturesArray,
        date : req.body.date
    });
    newModel.markModified('pictures');
    newModel.save(function(err, data){
        if(err){
            res.status(501).json({
                status: 'Internal Error'
            });
        } else {
            res.status(200).json({
                status: 'Saved'
            });
        }
    });
});

// GET for list one new
router.get('/getArticles/:id', function (req, res, next) {
    var id = req.params.id;
    NewsModel.findOne({
        _id : id
    }, function(err, news){
        if(err){
            res.status(501).json({
                status: 'Internal Error'
            });
        }else{
            res.send(news);
        } 
    }); 
}); 

// GET for list all news
router.get('/getArticles', function (req, res, next) {
        NewsModel.find({}, function(err, news){
            if(err){
                res.status(501).json({
                    status: 'Internal Error'
                });
            }else{
                res.send(news);
            }
        });
  });

  router.put('/updateArticle/:id', function(req, res){
        var id = req.params.id;
        NewsModel.findById(id, function (err, news){
            if(err){
                res.status(501).json({
                    status: 'Internal Error'
                });
            } else {
                news.title = req.body.title;
                news.content = req.body.content;
                news.pictures = req.body.pictures;

                news.save(function(err, news){
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
    NewsModel.remove({
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