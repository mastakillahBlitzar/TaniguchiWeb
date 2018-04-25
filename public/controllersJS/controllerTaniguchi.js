var myApp = angular.module('myApp');


myApp.controller('loginController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.login = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        AuthService.login($scope.user.email, $scope.user.password)
          // handle success  
          .then(function () {
            $location.path('/adminprofile');
            $scope.disabled = false;
            $scope.user = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });

      };

    }]);

myApp.controller('logoutController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.logout = function () {

        // call logout from service
        AuthService.logout()
          .then(function () {
            $location.path('/login');
          });

      };

    }]);

myApp.controller('registerController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.register = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
          // handle success
          .then(function () {
            $location.path('/login');
            $scope.disabled = false;
            $scope.registerForm = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Something went wrong!";
            $scope.disabled = false;
            $scope.registerForm = {};
          });

      };

    }]);

myApp.controller('ArticleDetailController',
  ['$scope', '$routeParams', '$location', 'ArticleService',
    function ($scope, $routeParams, $location, ArticleService) {

      var id = $routeParams._id;

      if (id !== "null") {
        $scope.isEdit = true;
        //TODO: llamar metodo que trae el articulo por el atributo id
        ArticleService.getOneArticle(id)
          .then(function (data) {
            $scope.article = data;
          })
          .catch(function () {
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

      $scope.addArticle = function () {

        $scope.submitted = true;

        var title = $scope.article.title;
        var content = $scope.article.content;
        var pictures = $scope.article.pictures;

        ArticleService.addArticle(title, content, pictures)

          .then(function (response) {
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
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Something went wrong!";
          });
      }

      $scope.updateArticle = function (article) {
        ArticleService.updateArticle(article._id, article)
          .then(function (response) {
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
          .catch(function () {
            $scope.errorMessage = "Ops!, something went wrong";
          })
      }


    }]);

myApp.controller('ArticleController',
  ['$scope', '$location', '$routeParams', 'ArticleService',
    function ($scope, $location, $routeParams, ArticleService) {

      refresh();
      /* obtain param from url */
      $scope.outputMsg = $routeParams.param;

      $scope.redirectToForm = function (id) {
        var _id = id;
        $location.path('/forms/' + _id);
      }

      $scope.remove = function (id) {
        ArticleService.deleteArticle(id)
          .then(function () {
            refresh();
          });
      }

      function refresh() {
        ArticleService.getArticles()

          .then(function (data) {
            $scope.articleList = data;
          })
          .catch(function () {

          });
      }
    }]);


myApp.controller('HomeNewsController',
  ['$scope', 'ArticleService',
    function ($scope, ArticleService) {
      refresh();

      var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

      function refresh() {
        ArticleService.getArticles()

          .then(function (data) {
            //
            data.forEach(function (element) {
              //split the string
              var dateArray = element.date.split("-");
              //extract the month from the resulting array
              var currentMonth = dateArray[1];
              var month = months[currentMonth - 1];
              //get day
              var dayArray = dateArray[2].split("T");
              day = dayArray[0];

              element.daymonth = day.concat(" ").concat(month);
            })
            $scope.articleList = data;

          })
          .catch(function () {

          });
      }

      $scope.readMoreClicked = function (index) {
        $('.slider').bxSlider();
      }



    }]);

myApp.controller('redirectController',
  ['$scope', '$location',
    function ($scope, $location) {
      $scope.home = function () {
        $location.path('/home');
      }

      $scope.services = function () {
        $location.path('/business');
      }

      $scope.company = function () {
        $location.path('/company');
      }

      $scope.contact = function () {
        $location.path('/contact');
      }

    }]);

myApp.controller('mpHeaderController',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.openNewTabLoc = function () {
        ActionService.openNewTabLoc($window);
      };

    }]);

myApp.controller('mpFooterController',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.openNewTabLoc = function () {
        ActionService.openNewTabLoc($window);
      };

    }]);

myApp.controller('gsContactFormCtrl',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.sendContactForm = function (msg) {
        var email = "juano.diy@gmail.com";
        var message = msg;
        ActionService.sendEmail(message, email)
          .then(function (res) {
            if (res.status === 200) {
              $scope.gsContactForm.$setPristine();
              $scope.gscontact = {};
            }
            $scope.message = res.data.status;
          });
      };

    }]);

myApp.controller('OwnersPgCtrl',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.ownersInfo = [
        {
          id: '1',
          msg: 'Recommendation related to troubled tenants and hazardous material handling compliance'
        },
        {
          id: '2',
          msg: 'Owner, please leave us anything uncontrollable by yourself'
        },
        {
          id: '3',
          msg: 'Make a statement about the general idea of the requirements for rent'
        },
        {
          id: '4',
          msg: 'Please do not hesitate to contact us for costs and details'
        },
      ]

      $scope.reviews = [
        {
          houseImgPath: '../R/modern-house.jpg',
          reviewerPath: '../R/gsreviewers/face_rev_1.jpg',
          title: 'Mr. Kuriyama, City Resident',
          text: 'Taniguchi General service is the first real state agency which has taken care of me. It is the best real agency in takikawa shi.'
        },
        {
          houseImgPath: '../R/modern-house.jpg',
          reviewerPath: '../R/gsreviewers/face_rev_1.jpg',
          title: 'Takashi living in Takikawa city',
          text: 'It is difficult to manage property because of many jobs. Taniguchi General service is the first real state agency which has taken care of me. It is the best real agency in takikawa shi.'
        },
        {
          houseImgPath: '../R/modern-house.jpg',
          reviewerPath: '../R/gsreviewers/face_rev_1.jpg',
          title: 'Yu. Mr Takigawa residing in Japan',
          text: 'I am self employed. Taniguchi General service is the first real state agency which has taken care of me. It is the best real agency in takikawa shi.'
        },
      ]

    }]);

myApp.controller('GsHomeCtrl',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {


    }]);