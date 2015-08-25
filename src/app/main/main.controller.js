'use strict';

angular.module('lunarPhases')
  .controller('MainCtrl', function ($scope, $geolocation, Astronomy) {
    $scope.loadingDone = false;
    $geolocation.getCurrentPosition({
      timeout: 4000
    }).then(function(position) {
      $scope.loadingDone = true;
      $scope.myPosition = position;
      // console.log('MY POSITION: ', $scope.myPosition);
      var astronomy = Astronomy.get({lat: $scope.myPosition.coords.latitude, long: $scope.myPosition.coords.longitude});
      astronomy.$promise.then(function(data){
        $scope.lunarPhase = data.moon_phase;
        $scope.lunarPhase.percentIlluminated = String($scope.lunarPhase.percentIlluminated * 0.01);
        
        //Waxing is true, Waning is false
        var x = angular.lowercase($scope.lunarPhase.phaseofMoon);
        // console.log(x, x.indexOf('wax'));
        $scope.phaseBool = x.indexOf('wax') != -1 ? true : false;

        // console.log($scope.phaseBool);
        // console.log($scope.lunarPhase);
      });

    });


  });
