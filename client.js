// Create an array of people
var peopleArray = [{name: 'Chris', github:'christopher-black'}, {name: 'Scott', github:'scottbromander'}, {name: 'Huck', github:'huckbee'}];

var myApp = angular.module('myApp', []); // Leave array empty for now

myApp.controller('NameController', ['$scope', function($scope){
  // Bring the peopleArray into scope
  $scope.peopleArray = peopleArray;
  $scope.searchString = "";

  // Create a function in scope
  $scope.searchName = function(nameValue) {
    var isMatch = false;
    if (nameValue.toLowerCase().includes($scope.searchString.toLowerCase())) {
      isMatch = true;
    }
    return isMatch;
  };

  $scope.greetPerson = function(nameValue) {
    console.log('Hello', nameValue);
    alert('Hello ' + nameValue + '!');
  };
}]);
