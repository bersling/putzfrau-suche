Ads = new Mongo.Collection("ads");
Coords = new Mongo.Collection("coords");
Coordinates = new Mongo.Collection("coordinates");

//IMAGES
var createSquareThumb = function(fileObj, readStream, writeStream) {
  var size = '200';
  gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};

var thumbStore = new FS.Store.FileSystem("thumbs", {
  transformWrite: createSquareThumb
});

Images = new FS.Collection("images", {
  stores: [thumbStore]
});
//END IMAGES

if (Meteor.isClient) {

  Spiderable.makeSpiderable('h2c');

  angular.module('h2c').controller('HomeController', ['$scope',
    function($scope) {

    }
  ]);

  angular.module('h2c').controller('SearchController', ['$scope', '$meteor', '$q',
    function($scope, $meteor, $q) {
      $scope.ads = $meteor.collection(Ads);
      $scope.images = $meteor.collectionFS(Images, false, Images);
      $scope.query = {};
      $scope.orderParameter = '-created';
      $scope.getImageUrl = function(id) {
        var img = Images.findOne(id);
        if (img) {
          return Images.findOne(id).url();
        }
      };
      $scope.updateDistances = function() {

        if ($scope.query.plz < 1000 || $scope.query.plz > 9999) {
          $scope.orderParameter = '-created';
        } else {
          $scope.orderParameter = 'distance.value';
          angular.forEach($scope.ads, function(ad, index) {
            delete ad.email;
            delete $scope.ads[index].name;
          });

          var promises = [];
          $scope.distances = [];
          angular.forEach($scope.ads, function(ad) {
            promises.push($meteor.call('getDistance', $scope.query.plz, ad.plz).then(function(response) {
              return response;
            }));
          });
          
          $q.all(promises).then(function(data) {
            angular.forEach($scope.ads, function(ad, index) {
              ad.distance = data[index];
            });
          });
        }

      };
    }

  ]);

  angular.module('h2c').controller('SubmitController', ['$scope', '$meteor', '$state',
    function($scope, $meteor, $state) {
      $scope.ads = $meteor.collection(Ads);
      $scope.images = $meteor.collectionFS(Images, false, Images);
      $scope.newAd = {};
      $scope.uploadFile = function(event) {
        FS.Utility.eachFile(event, function(file) {
          Images.insert(file, function(err, fileObj) {
            if (!err) {
              // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
              $scope.newAd.pic = fileObj._id;
            } else {
              console.log(err)
            }

          });
        });
      };
      $scope.submit = function() {
        $scope.newAd.created = new Date().getTime();
        Meteor.call('addAd', $scope.newAd);
        $state.go('search');
      };
    }
  ]);

}

if (Meteor.isServer) {

  Images.allow({
    download: function(userId, fileObj) {
      return true
    },
    'insert': function () {
      // add custom authentication code here
      return true;
    },
    'update': function () {
      // add custom authentication code here
      return true;
    }
  });

  Meteor.methods({
    getDistance: function(origin, dest) {
      //8000 is default      
      //var originCoords = Coords.findOne({plz: origin}).coords || [47.360508,8.475219];
      //var destCoords = Coords.findOne({plz: dest}).coords || [47.360508,8.475219];

      /*
      var distanceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
        originCoords[0] + "," + originCoords[1] + "&destinations=" +
        destCoords[0] + "," + destCoords[1] +
        "&key=AIzaSyBTGVUac5RqaXPe_Dfsooz5ake9O0X2-Hs";
        */

      var distanceUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
        origin + ",Schweiz&destinations=" + dest +
        ",Schweiz&key=AIzaSyBTGVUac5RqaXPe_Dfsooz5ake9O0X2-Hs";
      var result = HTTP.get(distanceUrl);


      if (result.data.rows && result.data.rows[0]) {
        return result.data.rows[0].elements[0].distance;
      }
    },
    addAd: function(newAd) {
      Ads.insert(newAd);
    }
  });

  Meteor.startup(function() {
    //Ads.remove({});
    // code to run on server at startup

  });
}
