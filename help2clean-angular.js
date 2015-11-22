Ads = new Mongo.Collection("ads");

if (Meteor.isClient) {

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
