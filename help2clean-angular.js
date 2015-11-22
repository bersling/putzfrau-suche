Ads = new Mongo.Collection("ads");

//IMAGES
var createSquareThumb = function(fileObj, readStream, writeStream) {
  var size = '130';
  gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};

var thumbStore = new FS.Store.FileSystem("thumbs", { transformWrite: createSquareThumb });

Images = new FS.Collection("images", { stores: [thumbStore] });
//END IMAGES


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
      $scope.uploadFile = function() {
        FS.Utility.eachFile(event, function(file) {
          Images.insert(file, function(err, fileObj) {
            if (!err) {
              // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
              Session.set('imageId', fileObj._id);
            } else {
              console.log(err)
            }

          });
        });
      };
    }
  ]);

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
