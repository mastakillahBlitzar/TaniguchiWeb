var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
       .when('/', {
        templateUrl: '../partials/home.html',
        resolve:  { 
          access: function() {
              return false;
          }
        }
      })
      .when('/home', {
        templateUrl: '../partials/home.html',
        resolve:  { 
          access: function() {
              return false;
          }
        }
      })
      .when('/login', {
        templateUrl: '../partials/login.html',
        controller: 'loginController',
        resolve:  { 
          access: function() {
              return false;
          }
        }
      })
      .when('/logout', {
        controller: 'logoutController',
        resolve:  { 
          access: function() {
              return false;
          }
        }
      })
      .when('/register', {
        templateUrl: '../admin/register.html',
        controller: 'registerController',
        resolve:  { 
          access: function() {
              return true;
          }
        }
      })
      .when('/adminprofile', {
        templateUrl: '../admin/adminprofile.html',
        resolve:  { 
          access: function() {
              return true;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
        
      });

  });

  myApp.run(function ($rootScope, $location, $route, AuthService) {
    //debugger;
    $rootScope.$on('$routeChangeStart',
      function (event, next, current) {
        AuthService.getUserStatus()
        .then(function(){
          if (next.resolve.access && !AuthService.isLoggedIn()){
            $location.path('/login');
            $route.reload();
          }
        });
    });
  });