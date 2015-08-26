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

            scope.draw = function(){
                drawPlanetPhase(document.getElementById('moon'), scope.percent, scope.bool, {
                    diameter: attr.diameter,
                    shadowColour: attr.shadowColour,
                    lightColour: attr.lightColour,
                    blur: 0,
                    earthshine: 0.3,
                });
            };

            attr.$observe('percentIllum', function(value){
                if(value){
                    scope.percent = value;
                    // console.log(value);
                    // scope.draw();
                }
            });
            attr.$observe('waxWane', function(value){
                if(value){
                    scope.bool = value;
                    // console.log(value);
                    // scope.draw();
                }
            });
            scope.$watchGroup(['percent','bool'], function(newValues, oldValues){
                if(newValues[1] != ""){
                    scope.draw();
                    // console.log(newValues);
                }
            });
        }
    };
});