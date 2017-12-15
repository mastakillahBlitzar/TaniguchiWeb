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
['$scope', '$location', 'ArticleService',
function($scope, $location, ArticleService){
  
  $scope.labels = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'}
  ];

  $scope.addArticle = function(){

    $scope.submitted = true;

        var title = $scope.article.title;
        var content = $scope.article.content;
        var mainUrl = $scope.article.mainUrl;
        var urls = $scope.article.url;
        var des = $scope.article.des;

        ArticleService.addArticle(title, content, mainUrl,urls, des)
    
        .then(function(){
          refresh();
        })
        .catch(function(){
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.article = {};
        });
      }

}]);

myApp.controller('ArticleController',
['$scope', '$location', 'ArticleService', 
function($scope, $location, ArticleService){

  refresh();

  $scope.redirectToForm = function(){
    $location.path('/forms');
  }

  $scope.remove = function(id){
    ArticleService.deleteArticle(id)
    .then(function(){
      refresh();
    });
  }

  function refresh() {
    ArticleService.getArticles()

    .then(function(data){
      $scope.articleList = data;
    })
    .catch(function(){

    });
  }
}]);


myApp.controller('HomeNewsController', 
['$scope', 'ArticleService', 
function($scope, ArticleService){
  refresh();

  var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  function refresh() {
    ArticleService.getArticles()

    .then(function(data){
      //
      data.forEach(function(element) {
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
    .catch(function(){

    });
  }

  $scope.readMoreClicked = function(index){
    $('.slider').bxSlider();
  }



}]);

myApp.controller('redirectController',
['$scope', '$location', 
function($scope, $location){
  $scope.home = function(){
    $location.path('/home');
  }

  $scope.services = function(){
    $location.path('/business');
  }

  $scope.company = function(){
    $location.path('/company');
  }

  $scope.contact = function(){
    $location.path('/contact');
  }

}]);