'use strict';

angular.module('lunarPhases')
    .controller('MainCtrl', function ($scope, $geolocation, Astronomy) {
        $scope.loadingDone = false;

        //Gets the astronomy data
        $scope.getData = function(data){

            //Store geolocation data 
            $scope.myPosition = data;

            //Call the factory and get the astronomy location
            var astronomy = Astronomy.get({lat: $scope.myPosition.coords.latitude, long: $scope.myPosition.coords.longitude});
            astronomy.$promise.then(function(data){

                //Store moon phase data
                $scope.lunarPhase = data.moon_phase;
                //Convert percent 
                $scope.lunarPhase.percentIlluminated = String($scope.lunarPhase.percentIlluminated * 0.01);
                
                //Waxing is true, Waning is false
                var x = angular.lowercase($scope.lunarPhase.phaseofMoon);
                $scope.phaseBool = x.indexOf('wax') != -1 ? true : false;

            });
        };

        //Gets geolocation data
        $geolocation.getCurrentPosition({
            timeout: 4000
        }).then(function(position) {

            //If successful
            $scope.loadingDone = true;
            //Pass geolocation data to get astronomy
            $scope.getData(position);

        }, function(error){

            //If error
            $scope.loadingDone = true;

            //Save error message
            $scope.error = error;

            // Set default
            var defaultPosition = {
                coords: {
                    latitude: 39.101269,
                    longitude: -76.8514
                }
            };

            //Pass default location to get astronomy
            $scope.getData(defaultPosition);
        });

    });
