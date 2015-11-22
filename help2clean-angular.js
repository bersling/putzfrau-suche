if (Meteor.isClient) {

  // This code only runs on the client
   angular.module('h2c',['angular-meteor', 'ui.router']);

   angular.module('h2c').config(function($urlRouterProvider, $stateProvider, $locationProvider){
   
     $locationProvider.html5Mode(true);
 
     $stateProvider
       .state('home', {
         url: '/home',
         templateUrl: 'home.html',
         controller: 'HomeCtrl'
       }).state('search', {
         url: '/search',
         templateUrl: 'search.html',
         controller: 'SearchCtrl'
       });
 
     $urlRouterProvider.otherwise("/home");
   });

   angular.module('h2c').controller('HomeCtrl', ['$scope',
     function ($scope) {
  
   }]);

   angular.module('h2c').controller('SearchCtrl', ['$scope',
     function ($scope) {
   
       $scope.tasks = [
         { text: 'This is task 1' },
         { text: 'This is task 2' },
         { text: 'This is task 3' }
       ];
   
   }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
