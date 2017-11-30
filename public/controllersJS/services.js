var myApp = angular.module('myApp');

myApp.factory('AuthService',
['$q', '$timeout', '$http',
function ($q, $timeout, $http) {
 // create user variable
 var articles = [];
 
     // return available functions for use in the controllers
     return ({
       isLoggedIn: isLoggedIn,
       getUserStatus: getUserStatus,
       login: login,
       logout: logout,
       register: register
     });

     function isLoggedIn() {
       //debugger;
      if(user) {
        return true;
      } else {
        return false;
      }
    }
    
    function getUserStatus() {
     // debugger;
      return $http.get('/user/status')
      // handle success
      .then(function(success){
        if(success.data.status){
          user = true;
        } else {
          user = false;
        }
      }, function(error){
        console.log(error);
      });
    }
    
    function login(username, password) {
    
      // create a new instance of deferred
      var deferred = $q.defer();
    
      // send a post request to the server
      $http.post('/user/auth',
        {username: username, password: password})
        // handle success
        .then(function(response){
          if(response.status === 200 && response.data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        }, function(error){
          user = false;
          deferred.reject();
        })
    
      // return promise object
      return deferred.promise;
    
    }
    
    function logout() {
    
      // create a new instance of deferred
      var deferred = $q.defer();
    
      // send a get request to the server
      $http.get('/user/logout')
      .then(function(success, data){
        user = false;
        deferred.resolve();
      }, function(error){
        user = false;
        deferred.reject();
      })
      // return promise object
      return deferred.promise;
    
    }
    
    function register(username, password) {
    
      // create a new instance of deferred
      var deferred = $q.defer();
    
      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password})
        .then(function(success, data, status){
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }, function(error){
          deferred.reject();
        })
      // return promise object
      return deferred.promise;
    
    }
 
 }]);