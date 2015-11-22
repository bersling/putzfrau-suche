Ads = new Mongo.Collection("ads");

if (Meteor.isClient) {

  angular.module('h2c').controller('HomeController', ['$scope',
    function($scope) {

    }
  ]);

  angular.module('h2c').controller('SearchController', ['$scope', '$meteor',
    function($scope, $meteor) {

      $scope.ads = $meteor.collection(Ads);

    }
  ]);

  angular.module('h2c').controller('SubmitController', ['$scope',
    function($scope) {
      console.log('here');
      $scope.uploadFile = function() {
        var filename = event.target.files[0].name;
        alert('file was selected: ' + filename);
      };
    }
  ]);

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
