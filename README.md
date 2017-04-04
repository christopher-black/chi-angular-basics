# Chi Angular Basics
## Controllers

**index.html**

```HTML
<div ng-controller="WelcomeController">
  <!-- We have access here to anything in WelcomeController -->
  {{welcomeMessage}}

  <!-- data binding -->
  <input type="text" ng-model="welcomeMessage">
</div>
```

**client.js**

```JavaScript
var myApp = angular.module('myApp', []); // Leave array empty for now

myApp.controller('WelcomeController', ['$scope', function($scope){
  // $ represents a service
  // welcomeMessage is a property we are creating on scope
  $scope.welcomeMessage = 'Hello World';
}]);
```

## Multiple instances of a controller in HTML

We can have individual instances of the same controller. They will each have their own `welcomeMessage`. They both leverage the same controller code from the `client.js`. This allows us to write code in a modular way.

**index.html**

```HTML
<div ng-controller="WelcomeController">
  <!-- We have access here to anything in the WelcomeController $scope -->
  {{welcomeMessage}}

  <!-- data binding -->
  <input type="text" ng-model="welcomeMessage">
</div>
<div ng-controller="WelcomeController">
  <!-- We have access here to anything in the WelcomeController $scope -->
  {{welcomeMessage}}

  <!-- data binding -->
  <input type="text" ng-model="welcomeMessage">
</div>
```

## $scope vs. variables

`welcomeMessage` is a publicly accessible variable. `x` is a private variable and is not available on the DOM.

**client.js**

```JavaScript
var myApp = angular.module('myApp', []); // Leave array empty for now

myApp.controller('WelcomeController', ['$scope', function($scope){
  // $ represents a service
  // welcomeMessage is a property we are creating on scope
  $scope.welcomeMessage = 'Hello World';

  // Not available on the DOM!
  var x = 5;
}]);
```

**index.html**

```HTML
<div ng-controller="WelcomeController">
  <!-- We have access here to anything in the WelcomeController $scope -->
  {{welcomeMessage}}

  <!-- Private variables not available, won't work -->
  {{x}}
</div>
```

## Multiple controllers in JavaScript

Variables aren't available between controllers.

**client.js**

```JavaScript
var myApp = angular.module('myApp', []); // Leave array empty for now

myApp.controller('WelcomeController', ['$scope', function($scope){
  $scope.welcomeMessage = 'Hello World';
}]);

myApp.controller('GreetController', ['$scope', function($scope){
  // This won't work, we don't have access to welcomeMessage!
  $scope.greetMessage = $scope.welcomeMessage;
}]);
```

**index.html**

```HTML
<div ng-controller="WelcomeController">
  <!-- We have access here to anything in the WelcomeController $scope -->
  {{welcomeMessage}}
</div>
<div ng-controller="GreetController">
  <!-- We have access here to anything in the WelcomeController $scope -->
  {{greetMessage}}
</div>
```

**BREAK FOR LUNCH**

## ng-repeat

Similar to a for in loop. Loops through content in an array.

**client.js**

```JavaScript
// Create an array of people
var peopleArray = [{name: 'Chris', github:'christopher-black'}, {name: 'Scott', github:'scottbromander'}, {name: 'Huck', github:'huckbee'}];

var myApp = angular.module('myApp', []); // Leave array empty for now

myApp.controller('NameController', ['$scope', function($scope){
  // Bring the peopleArray into scope
  $scope.peopleArray = peopleArray;

  // Create a function in scope
  $scope.searchName = function(nameValue) {
    var isMatch = false;
    if (nameValue.toLowerCase().includes($scope.searchName.toLowerCase())) {
      isMatch = true;
    }
    return isMatch;
  }
}]);
```

**index.html**

`ng-repeat` duplicates the div for each object in the array. `ng-src` is used for images that use Angular variables. It ensures the variable is populated before the image is loaded. A regular `src` attribute may attempt to load the resource prior to Angular.

_NOTE: `?size=50` is specific to GitHub images_

`ng-show` displays if the expression evaluates to `true`. `ng-hide` does the opposite.

```HTML
<div ng-controller="NameController">
  <input type="text" ng-model="searchString">

  <!-- We have access here to anything in the NameController $scope -->
  <div ng-show="searchName(people.name)"
       ng-repeat="person in peopleArray">
    <!-- person is an object with a name property -->
    Hello, {{person.name}}!!!
    <img ng-src="https://github.com/{{person.github}}.png?size=80" />
  </div>
</div>
```

You can filter content in an `ng-repeat` using a filter. For example, `ng-repeat="people in peopleArray | limit 3"`. You can add multiple filters that are all separated by `|`.

`ng-click` is a way of handling click events (e.g. button click).

```HTML
<button ng-click="console.log('Submit was clicked!')">Submit</button>
```
