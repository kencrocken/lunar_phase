'use strict';

angular.module('lunarPhases')

.directive('moon', function(){
    return {
        restrict: 'E',
        scope: {
            percentIllum: '@',
            waxWane: '@'
        },
        link: function(scope, el, attr){
            scope.percent = attr.percentIllum;
            scope.bool = attr.waxWane;

            //Function to draw the moon phase
            scope.draw = function(){
                
                //Converts string to a boolean
                var bool = (scope.bool == "true");

                //Invokes the planetPhase.js 
                drawPlanetPhase(document.getElementById('moon'), scope.percent, bool, {
                    diameter: attr.diameter,
                    shadowColour: attr.shadowColour,
                    lightColour: attr.lightColour,
                    blur: 0,
                    earthshine: 0.3,
                });
            };

            //Looks for changes
            attr.$observe('percentIllum', function(value){
                if(value){
                    scope.percent = value;
                }
            });

            attr.$observe('waxWane', function(value){
                if(value){
                    scope.bool = value;
                }
            });

            //When there is a new value, calls the draw function - allows
            //data to be returned to controller
            scope.$watchGroup(['percent','bool'], function(newValues, oldValues){
                if(newValues[1] != ""){
                    scope.draw();
                }
            });
        }
    };
});