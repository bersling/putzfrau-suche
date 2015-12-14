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
  stores: [thumbStore],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});
//END IMAGES

if (Meteor.isClient) {

  Spiderable.makeSpiderable('h2c');


  angular.module('h2c').controller('HomeController', ['$scope',
    function($scope) {
      document.title = 'Putzfrauen suchen oder einfach inserieren';
    }
  ]);

  angular.module('h2c').controller('InfoController', ['$scope',
    function($scope) {
      document.title = 'Rechtliche Schritte um eine Putzfrau anzustellen';
    }
  ]);

  angular.module('h2c').controller('SearchController', ['$scope', '$meteor', '$q', '$stateParams', '$rootScope',
    function($scope, $meteor, $q, $stateParams, $rootScope) {
      document.title = 'Putzfrau Inserate';
      $scope.ads = $meteor.collection(Ads).subscribe('ads');;
      $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
      $scope.query = {};
      $scope.orderParameter = '-created';
      $scope.key = $stateParams.key;
      $scope.getImageUrl = function(id) {
        var img = Images.findOne(id);
        if (img) {
          return Images.findOne(id).url();
        }
      };
      $scope.isAdmin = function() {
        return $stateParams.key === "wW4JRfZ3kQqjaU7J"
      };
      $meteor.call('getClientIP').then(function(response) {
        $scope.clientIP = response;
      });
      $scope.deleteAd = function(ad) {
        var r = confirm("Möchten Sie das wirklich löschen?");
        if (r) {
          $meteor.call('deleteAd', ad._id);
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

  angular.module('h2c').controller('SubmitController', ['$scope', '$meteor', '$state', '$rootScope', '$stateParams',
    function($scope, $meteor, $state, $rootScope, $stateParams) {
      document.title = 'Suche Job als Putzfrau';
      $scope.ads = $meteor.collection(Ads);
      $scope.images = $meteor.collectionFS(Images, false, Images);

      //initialize
      var initialize = function() {
        $scope.freshAd = true;
        $scope.newAd = {};
        $scope.newAd.languages = {};
        var key = Math.random().toString(36).substr(2, 12);
        $scope.newAd.key = key;
      };

      if ($stateParams.ad) {
        $meteor.call('getAd', $stateParams.ad).then(function(response) {
          if (response) {
            $scope.newAd = response;
          } else {
            initialize();
          }
        });
      } else {
        initialize();
      }

      $scope.languages = ['de', 'fr', 'it', 'hr', 'al', 'gb', 'pt', 'es', 'tr', 'in', 'nl', 'ru', 'cn', 'th', 'mk', 'hu'];
      $scope.uploadFile = function(event) {
        FS.Utility.eachFile(event, function(file) {
          Images.insert(file, function(err, fileObj) {
            if (!err) {
              // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
              $scope.newAd.pic = fileObj._id;
            } else {
              toastr.warning('Please select an image file (.jpg, .png, ...)');
            }
          });
        });
      };
      $scope.submit = function() {
        var allFieldsNonEmpty = $scope.newAd.name &&
            $scope.newAd.plz &&
            $scope.newAd.email &&
            $scope.newAd.pic &&
            $scope.newAd.age &&
            $scope.newAd.description &&
            $scope.newAd.price;

        if (allFieldsNonEmpty) {
          $scope.newAd.created = new Date().getTime();

          if ($scope.freshAd) {
            var url = window.location.origin + $state.href('search', {cc: $rootScope.cc || 'de', key: $scope.newAd.key});
            Meteor.call('sendMail', $scope.newAd, url);
            Meteor.call('addAd', $scope.newAd); 
          }
          else {
            Meteor.call('updateAd', $scope.newAd);
          }

          $state.go('search', {cc: $rootScope.cc || 'de', key: $scope.newAd.key});
        } else {
          toastr.warning('Please fill out all fields');
        }
      }
    }
  ]);

}

if (Meteor.isServer) {

  Meteor.publish("ads", function () {
    var now = new Date().getTime();
    var month = 2628000000;
    var oneMonthAgo = now - month;

    return Ads.find({
      created: {$gt: oneMonthAgo}
    });
  });

  Meteor.publish("images", function () {
    return Images.find({});
  });

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
    sendMail: function (newAd, url) {
      var html = 'Vielen Dank, dass Sie auf putzfrau-suche.ch inseriert haben! <br> Um Ihr Inserat zu editieren, klicken Sie auf: <a href=' + url + '>' + url + '</a> <br><br> Freundliche Grüsse <br> Ihr putzfrau-suche.ch Team';
      var optionsSendInfo = {
          from: "support@putzfrau-suche.ch",
          to: [newAd.email],
          bcc: ["bersling@gmail.com"],
          subject: "Link zum Editieren auf putzfrau-suche.ch",
          html: html
      }
      Email.send(optionsSendInfo);
    },
    getAd: function(id) {
      var ad = Ads.findOne({_id: id});
      return ad;
    },
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
    },
    updateAd: function(newAd) {
      Ads.update({_id: newAd._id}, newAd);
    },
    deleteAd: function(id) {
      Ads.remove({_id: id});
    },
    getClientIP: function() {
      return this.connection.clientAddress;
    }
  });

  Meteor.startup(function() {
    //Ads.remove({});
    // code to run on server at startup

  });
}
