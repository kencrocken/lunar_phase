'use strict';

angular.module('lunarPhases')
.factory('Astronomy', function ($resource) {
    return $resource('http://api.wunderground.com/api/c77d8fb81faedd5d/astronomy/q/:lat,:long.json',{lat: '@lat', long: '@long'});
});