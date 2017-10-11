var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope','$http', function($scope, $http) {
    console.log("Event Controller");
    
var refresh = function(){
    $http.get('/articles').success(function(response) {
    console.log("Success");
    $scope.eventList = response;
    $scope.event = "";
});
};
    
refresh();
    
$scope.login = function(){
    console.log($scope.user)
    $http.post('/auth', $scope.user).success(function(response){
        console.log(response);
    });
}
    

}]);

