var myApp = angular.module('myApp');

myApp.factory('ArticleService',
['$q', '$timeout', '$http', 
function($q, $timeout, $http){

    var article = null;

    return({
        addArticle : addArticle,
        getArticles : getArticles,
        deleteArticle : deleteArticle

    });

    function addArticle(title, content, imgUrl){
        var date = getDatetime();

        var deferred = $q.defer();

        debugger;

        var article = {
            title : title,
            content : content,
            pictures: [
                {
                url: imgUrl,
                description: "description"
                },
                {
                url: imgUrl,
                description: "description2"
                }
            ],
            date
        }

        $http.post('user/edit/addArticle', article)

        .then(function(response){
            if(response.status === 200){
                deferred.resolve();
            }
        });

        return deferred.promise;


    }

    function getArticles(){

        var deferred = $q.defer();

        $http.get('user/edit/getArticles')
        .then(function(result){
            deferred.resolve(result.data);
            /* article = result.data;
            return article; */
        }, function(error){

        });

        return deferred.promise;
    }

    function deleteArticle(id){

        var deferred = $q.defer();

        $http.delete('user/edit/deleteArticle/' + id)
        .then(function(response){
            if(response.status === 200){
                deferred.resolve();
            }
        })

        return deferred.promise;
    }

    function getDatetime() {
        return (new Date);
      };

}]);