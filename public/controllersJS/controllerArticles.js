var myApp = angular.module('myApp');

myApp.controller('ArticleDetailController',
    ['$scope', '$routeParams', '$location', 'ArticleService',
        function ($scope, $routeParams, $location, ArticleService) {

            var id = $routeParams._id;

            if (id !== "null") {
                $scope.isEdit = true;
                //TODO: llamar metodo que trae el articulo por el atributo id
                ArticleService.getOneArticle(id)
                    .then((data) => {
                        $scope.article = data;
                    })
                    .catch(() => {
                        $scope.error = "error en el servidor, intente recargar la pagina de nuevo";
                    });
            } else {
                $scope.isEdit = false;
            }

            $scope.labels = [
                { id: '1' },
                { id: '2' },
                { id: '3' },
                { id: '4' },
                { id: '5' }
            ];

            $scope.addArticle = () => {

                $scope.submitted = true;

                var title = $scope.article.title;
                var content = $scope.article.content;
                var pictures = $scope.article.pictures;

                ArticleService.addArticle(title, content, pictures)

                    .then((response) => {
                        if (response.status === 200) {
                            $scope.articleForm.$setPristine();
                            $scope.article = {};
                            $location
                                .path('/table')
                                .search({
                                    param: 'All good, is added!'
                                });
                        } else {
                            $scope.error = true;
                            $scope.errorMessage = "Something went wrong!";
                        }
                    })
                    .catch(() => {
                        $scope.error = true;
                        $scope.errorMessage = "Something went wrong!";
                    });
            };

            $scope.updateArticle = (article) => {
                ArticleService.updateArticle(article._id, article)
                    .then((response) => {
                        if (response.status === 200) {
                            $scope.article = {};
                            $location
                                .path('/table')
                                .search({
                                    param: 'All good, is edited!'
                                });
                        } else {
                            $scope.errorMessage = "Ops!, something went wrong";
                        }
                    })
                    .catch(() => {
                        $scope.errorMessage = "Ops!, something went wrong";
                    });
            };


        }]);

myApp.controller('ArticleController',
    ['$scope', '$location', '$routeParams', 'ArticleService', 'NewsService',
        function ($scope, $location, $routeParams, ArticleService, NewsService) {

            refresh();
            /* obtain param from url */
            $scope.outputMsg = $routeParams.param;

            $scope.redirectToForm = (id) => {
                var _id = id;
                console.log('here');
                $location.path('/forms/' + _id);
            };

            $scope.remove = (id) => {
                ArticleService.deleteArticle(id)
                    .then(() => {
                        refresh();
                    });
            };

            function refresh() {
                console.log('here');

                ArticleService.getArticles()
                    .then((data) => {
                        $scope.articleList = data;
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err));
                    });
            }

            refreshNews();
            /* obtain param from url */
            $scope.outputMsg = $routeParams.param;

            $scope.redirectToNewsForm = function (id) {
                var _id = id;
                console.log('working@');
                $location.path('/newsform/' + _id);
            };

            $scope.removeNew = (id) => {
                NewsService.deleteArticle(id)
                    .then(() => {
                        refreshNews();
                    });
            };

            function refreshNews() {
                NewsService.getArticles()
                    .then((data) => {
                        $scope.newsList = data;
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err));
                    });
            }
        }]);
