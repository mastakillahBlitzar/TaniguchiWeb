var myApp = angular.module('myApp');

myApp.factory('ActionService',
['$q', '$timeout', '$http',
function($q, $timeout, $http){

    return({
        openNewTabLoc : openNewTabLoc,
        sendEmail : sendEmail
    });

    function openNewTabLoc(window){
        var deferred = $q.defer();
        window.open('https://goo.gl/maps/2TU67Xk4E5q', '_blank');
        return deferred.promise;
    }

    function sendEmail(message, email){

        var deferred = $q.defer();
        var mailRequest = {
            message,
            email
        };
        $http.post('user/contact/send%form', mailRequest)
        .then(function(response, err){
            deferred.resolve(response);
        });

        return deferred.promise;
    }
    
}]);