var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope','$http', function($scope, $http) {
    console.log("Event Controller");
    
var refresh = function(){
    $http.get('/event').success(function(response) {
    console.log("Success");
    $scope.eventList = response;
    $scope.event = "";
});
};
    
refresh();
    
$scope.addEvent = function() {
    console.log($scope.event);
    $http.post('event', $scope.event);
    refresh();
};
    
    
$scope.remove = function(ev_id){
    var id = '{'
        + '"ev_id":' + ev_id
    +'}';
    console.log(id);
    $http.delete('event', id);
    refresh();
};
    

}]);

