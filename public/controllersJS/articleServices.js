var myApp = angular.module('myApp');

myApp.factory('ArticleService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            var article = null;

            return ({
                addArticle: addArticle,
                getOneArticle: getOneArticle,
                getArticles: getArticles,
                deleteArticle: deleteArticle,
                updateArticle: updateArticle
            });

            function addArticle(title, content, pictures) {

                var deferred = $q.defer();

                var article = buildArticle(title, content, pictures);

                $http.post('user/edit/addArticle', article)

                    .then(function (response) {
                        deferred.resolve(response);
                    });

                return deferred.promise;


            }

            function updateArticle(id, article) {
                var deferred = $q.defer();

                $http.put('user/edit/updateArticle/' + id, article)
                    .then(function (response) {
                        deferred.resolve(response);
                    })

                return deferred.promise;
            }

            function buildArticle(title, content, pictures) {

                var date = getDatetime();

                var article = {
                    title: title,
                    content: content,
                    pictures: pictures,
                    date
                }

                return article;
            }

            function getArticles() {

                var deferred = $q.defer();

                $http.get('user/edit/getArticles')
                    .then(function (result) {
                        deferred.resolve(result.data);
                        /* article = result.data;
                        return article; */
                    }, function (error) {

                    });

                return deferred.promise;
            }

            function getOneArticle(id) {

                var deferred = $q.defer();

                $http.get('user/edit/getArticles/' + id)
                    .then(function (result) {
                        deferred.resolve(result.data);
                        /* article = result.data;
                        return article; */
                    }, function (error) {

                    });

                return deferred.promise;
            }

            function deleteArticle(id) {

                var deferred = $q.defer();

                $http.delete('user/edit/deleteArticle/' + id)
                    .then(function (response) {
                        if (response.status === 200) {
                            deferred.resolve();
                        }
                    })

                return deferred.promise;
            }

            function getDatetime() {
                return (new Date);
            };

        }]);