var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
       .when('/', {
        templateUrl: '../partials/home.html',
        isLoggedIn: false
      })
      .when('/home', {
        templateUrl: '../partials/home.html',
        isLoggedIn: false
      })
      .when('/login', {
        templateUrl: '../partials/login.html',
        controller: 'loginController',
        isLoggedIn: false
      })
      .when('/logout', {
        controller: 'logoutController',
        isLoggedIn: true
      })
      .when('/register', {
        templateUrl: '../admin/register.html',
        controller: 'registerController',
        isLoggedIn: false
      })
      .when('/adminprofile', {
        templateUrl: '../admin/adminprofile.html',
        isLoggedIn: true
      })
      .when('/table', {
        templateUrl: '../admin/table.html',
        controller: 'ArticleController',
        isLoggedIn: true
      })
      .when('/business', {
        templateUrl: '../partials/business.html',
        isLoggedIn: false
      })
      .when('/company', {
        templateUrl: '../partials/company.html',
        isLoggedIn: false
      })
      .when('/forms', {
        templateUrl: '../admin/forms.html',
        controller: 'ArticleDetailController',
        isLoggedIn: true
      })
      .when('/profile', {
        templateUrl: '../admin/profile.html',
        controller: 'profileController',
        isLoggedIn: true
      })
      .when('/404', {
        templateUrl: '../admin/404.html',
        isLoggedIn: true
      })
      .otherwise({
        redirectTo: '/'
        
      });

  });

  myApp.run(function ($rootScope, $location, $route, AuthService) {
   
    $rootScope.$on('$routeChangeStart',
      function (event, next, current) {
        AuthService.getUserStatus()
        .then(function(){
         // debugger;
          if (next.isLoggedIn && !AuthService.isLoggedIn()){
            $location.path('/login');
            $route.reload();
          }
        });
    });
  });