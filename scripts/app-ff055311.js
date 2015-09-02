"use strict";angular.module("lunarPhases",["ngAnimate","ngResource","ui.router","ui.bootstrap","ngGeolocation"]).config(["$stateProvider","$urlRouterProvider",function(o,e){o.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}),e.otherwise("/")}]),angular.module("lunarPhases").controller("NavbarCtrl",["$scope",function(o){o.date=new Date}]),angular.module("lunarPhases").controller("MainCtrl",["$scope","$geolocation","Astronomy",function(o,e,n){o.loadingDone=!1,o.getData=function(e){o.myPosition=e;var a=n.get({lat:o.myPosition.coords.latitude,"long":o.myPosition.coords.longitude});a.$promise.then(function(e){console.log(e),o.lunarPhase=e.moon_phase,o.lunarPhase.percentIlluminated=String(.01*o.lunarPhase.percentIlluminated);var n=angular.lowercase(o.lunarPhase.phaseofMoon);o.phaseBool=-1!=n.indexOf("wax")?!0:!1})},e.getCurrentPosition({timeout:4e3}).then(function(e){o.loadingDone=!0,o.getData(e)},function(e){o.loadingDone=!0,o.error=e;var n={coords:{latitude:39.101269,longitude:-76.8514}};o.getData(n)})}]);/*
    Defines the function 'drawPlanetPhase' which will render a 'kind of' realistic lunar or planetary disc with
    shadow.

    The simplest way to call the function is like this:

        drawPlanetPhase(document.getElementById('container'), 0.15, true)

    the first argument is the HTML element that you want to contain the disc

    the second argument must be a value between 0 and 1, indicating how large the shadow should be: 
           0 = new moon
        0.25 = crescent
        0.50 = quarter
        0.75 = gibbous
        1.00 = full moon

    the third argument is a boolean value indicating whether the disc should be waxing or waning (ie which 
    side of the disc the shadow should be on):
         true = waxing - shadow on the left
        false = waning - shadow on the right

    the function accepts an optional fourth argument, containing configuration values which change the
    size, colour and appearance of the disc - see the comments on the 'defaultConfig' object for details.

    Copyright 2014 Rob Dawson
    http://codebox.org.uk/pages/planet-phase
*/
var drawPlanetPhase=function(){function o(o,e){var n,a=Math.abs(e),r=(1-a)*o/2||.01;return n=r/2+o*o/(8*r),{d:2*n,o:e>0?o/2-r:-2*n+o/2+r}}function e(o,e){var n;for(n in e)o.style[n]=e[n]}function n(o,n,a){var r,t;e(o.box,{position:"absolute",height:o.diameter+"px",width:o.diameter+"px",border:"1px solid black",backgroundColor:o.colour,borderRadius:o.diameter/2+"px",overflow:"hidden"}),r=n.diameter-a,t=n.offset+a/2,e(n.box,{position:"absolute",backgroundColor:n.colour,borderRadius:r/2+"px",height:r+"px",width:r+"px",left:t+"px",top:(o.diameter-r)/2+"px",boxShadow:"0px 0px "+a+"px "+a+"px "+n.colour,opacity:n.opacity})}function a(o){var e=document.createElement("div");return o.appendChild(e),e}function r(e,r,t,i){var l,u,d,s=a(e);.5>r?(l=i.lightColour,u=i.shadowColour,t&&(r*=-1)):(l=i.shadowColour,u=i.lightColour,r=1-r,t||(r*=-1)),d=o(i.diameter,2*r),n({box:e,diameter:i.diameter,colour:l},{box:s,diameter:d.d,colour:u,offset:d.o,opacity:1-i.earthshine},i.blur)}function t(o){var e;for(e in i)o[e]=void 0===o[e]?i[e]:o[e];return o}var i={shadowColour:"black",lightColour:"white",diameter:100,earthshine:.1,blur:3};return function(o,e,n,i){i=t(Object.create(i||{}));var l=a(o);r(l,e,n,i)}}();angular.module("lunarPhases").directive("moon",function(){return{restrict:"E",scope:{percentIllum:"@",waxWane:"@"},link:function(o,e,n){o.percent=n.percentIllum,o.bool=n.waxWane,o.draw=function(){var e="true"==o.bool;drawPlanetPhase(document.getElementById("moon"),o.percent,e,{diameter:n.diameter,shadowColour:n.shadowColour,lightColour:n.lightColour,blur:0,earthshine:.3})},n.$observe("percentIllum",function(e){e&&(o.percent=e)}),n.$observe("waxWane",function(e){e&&(o.bool=e)}),o.$watchGroup(["percent","bool"],function(e){""!=e[1]&&o.draw()})}}}),angular.module("lunarPhases").factory("Astronomy",["$resource",function(o){return o("http://api.wunderground.com/api/c77d8fb81faedd5d/astronomy/q/:lat,:long.json",{lat:"@lat","long":"@long"})}]),angular.module("lunarPhases").run(["$templateCache",function(o){o.put("app/main/main.html",'<div ng-include="\'components/navbar/navbar.html\'"></div><div ng-include="\'components/moon/moon.html\'"></div><div id="stars"></div><div id="stars2"></div><div id="stars3"></div><div class="loader" ng-show="!loadingDone">Loading...</div>'),o.put("components/moon/moon.html",'<moon percent-illum="{{ lunarPhase.percentIlluminated }}" wax-wane="{{ phaseBool }}" diameter="200" shadow-colour="#333333" light-colour="#e6e6e6" ng-if="loadingDone"><div id="title"><span>Tonight\'s Lunar Phase</span><br><span>{{ lunarPhase.phaseofMoon }}</span></div><div id="moon"></div><div id="info"><p>Percent Illuminated: {{ lunarPhase.percentIlluminated * 100 | number:0 }}%</p><p ng-if="error">{{ error.error.message }}</p><p></p><p ng-if="error">Using default location: Baltimore, MD</p><p></p></div></moon>'),o.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="container"><div class="navbar-header"><a class="navbar-brand" href="https://kencrocken.github.io">kencrocken.github.io</a><ul class="github pull-right"><li><a href="https://github.com/kencrocken/lunar_phase" target="_blank"><i class="fa fa-github-square"></i></a></li></ul></div></div></nav>')}]);