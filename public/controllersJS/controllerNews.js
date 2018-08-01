var myApp = angular.module('myApp');

myApp.controller('NewsDetailController',
    ['$scope', '$routeParams', '$location', 'NewsService',
        function ($scope, $routeParams, $location, NewsService) {

            var id = $routeParams._id;

            if (id !== "null") {
                $scope.isEdit = true;
                //TODO: llamar metodo que trae el articulo por el atributo id
                NewsService.getOneArticle(id)
                    .then((data) => {
                        $scope.new = data;
                    })
                    .catch(() => {
                        $scope.error = "error en el servidor, intente recargar la pagina de nuevo";
                    });
            } else {
                $scope.isEdit = false;
            }

            $scope.labels = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
                { id: 10 },
                { id: 11 },
            ];

            $scope.addNew = () => {

                $scope.submitted = true;

                var title = $scope.new.title;
                var content = $scope.new.content;
                var pictures = $scope.new.pictures;

                NewsService.addArticle(title, content, pictures)

                    .then((response) => {
                        if (response.status === 200) {
                            $scope.newsForm.$setPristine();
                            $scope.new = {};
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

            $scope.updateNew = (news) => {
                NewsService.updateArticle(news._id, news)
                    .then((response) => {
                        if (response.status === 200) {
                            $scope.new = {};
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
