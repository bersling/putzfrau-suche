Ads = new Mongo.Collection("ads");

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

  angular.module('h2c').controller('HomeController', ['$scope',
    function($scope) {

    }
  ]);

  angular.module('h2c').controller('SearchController', ['$scope', '$meteor',
    function($scope, $meteor) {
      $scope.ads = $meteor.collection(Ads);
      $scope.images = $meteor.collectionFS(Images, false, Images);
      $scope.query = {};
      $scope.getImageUrl = function(id) {
        var img = Images.findOne(id);
        if (img) {
          return Images.findOne(id).url();
        }
      };
      $scope.updateDistances = function() {

        if ($scope.query.plz < 1000 || $scope.query.plz > 9999) {
          return
        }

        angular.forEach($scope.ads, function(ad) {
          if (ad.plz) {
            Meteor.call('getDistance', $scope.query.plz, ad.plz, function(err, response) {
              ad.distance = response
              $scope.$apply();
            });
          }
        });
      };
    }
  ]);

  angular.module('h2c').controller('SubmitController', ['$scope', '$meteor', '$state',
    function($scope, $meteor, $state) {
      $scope.ads = $meteor.collection(Ads);
      $scope.images = $meteor.collectionFS(Images, false, Images);
      $scope.newAd = {};
      $scope.uploadFile = function() {
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
