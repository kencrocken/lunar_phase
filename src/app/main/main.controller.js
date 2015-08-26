'use strict';

angular.module('lunarPhases')
  .controller('MainCtrl', function ($scope, $geolocation, Astronomy) {
    $scope.loadingDone = false;

    $scope.getData = function(data){
      $scope.myPosition = data;

      var astronomy = Astronomy.get({lat: $scope.myPosition.coords.latitude, long: $scope.myPosition.coords.longitude});
      astronomy.$promise.then(function(data){

        $scope.lunarPhase = data.moon_phase;
        $scope.lunarPhase.percentIlluminated = String($scope.lunarPhase.percentIlluminated * 0.01);
        
        //Waxing is true, Waning is false
        var x = angular.lowercase($scope.lunarPhase.phaseofMoon);
        $scope.phaseBool = x.indexOf('wax') != -1 ? true : false;

      });
    };

    $geolocation.getCurrentPosition({
      timeout: 4000
    }).then(function(position) {

      $scope.loadingDone = true;
      $scope.getData(position);
      console.log(position);
    }, function(error){
      $scope.loadingDone = true;
      $scope.error = error;
      console.log($scope.error);
      var defaultPosition = {
        coords: {
          latitude: 39.101269,
          longitude: -76.8514
        }
      };
      console.log(defaultPosition);
      $scope.getData(defaultPosition);
    });

  });
