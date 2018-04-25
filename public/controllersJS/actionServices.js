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
        console.log('im here');
        window.open('https://www.google.com/maps?q=Japan, 〒073-0021 Hokkaidō, Takikawa-shi, 本町２丁目2 Chome−3−３番５号 ＴＳビル', '_blank');
        return deferred.promise;
    }

    function sendEmail(message, email){

        var deferred = $q.defer();
        var mailRequest = {
            message,
            email
        }
        $http.post('user/contact/send%form', mailRequest)
        .then(function(response, err){
            deferred.resolve(response);
        });

        return deferred.promise;
    }
    
}]);