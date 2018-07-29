var myApp = angular.module('myApp');


myApp.controller('loginController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.login = () => {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        AuthService.login($scope.user.email, $scope.user.password)
          // handle success  
          .then(() => {
            $location.path('/adminprofile');
            $scope.disabled = false;
            $scope.user = {};
          })
          // handle error
          .catch(() => {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });

      };

    }]);

myApp.controller('logoutController',
  ['$scope', '$location', 'AuthService',
    ($scope, $location, AuthService) => {

      $scope.logout = () => {

        // call logout from service
        AuthService.logout()
          .then(() => {
            $location.path('/login');
          });

      };

    }]);

myApp.controller('registerController',
  ['$scope', '$location', 'AuthService',
    ($scope, $location, AuthService) => {

      $scope.register = () => {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
          // handle success
          .then(() => {
            $location.path('/login');
            $scope.disabled = false;
            $scope.registerForm = {};
          })
          // handle error
          .catch(() => {
            $scope.error = true;
            $scope.errorMessage = "Something went wrong!";
            $scope.disabled = false;
            $scope.registerForm = {};
          });

      };

    }]);