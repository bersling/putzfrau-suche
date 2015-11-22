Ads = new Mongo.Collection("ads");

if (Meteor.isClient) {

  // This code only runs on the client

   angular.module('h2c').config(function($urlRouterProvider, $stateProvider, $locationProvider){
   
     $locationProvider.html5Mode(true);
 
     $stateProvider
       .state('home', {
         url: '/',
         templateUrl: 'home.html',
         controller: 'HomeController'
       }).state('search', {
         url: '/search',
         templateUrl: 'search.html',
         controller: 'SearchController'
       }).state('submit', {
         url: '/submit',
         templateUrl: 'submit.html',
         controller: 'SubmitController'
       });
 
     $urlRouterProvider.otherwise("/");
   });

   angular.module('h2c').controller('HomeController', ['$scope',
     function ($scope) {
  
   }]);


   angular.module('h2c').controller('SearchController', ['$scope', '$meteor',
     function ($scope, $meteor) {
   
       $scope.ads = $meteor.collection(Ads);
   
   }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
