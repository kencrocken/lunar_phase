#Lunar Phase
An AngularJS app to display the current phase of the moon, based on the users location.
Scaffolded with Yeoman gulp-angular generator.

###Moon Phase
####Geoloaction
To accurately reflect the moon phase for the user, the user's location is needed.  The location information is gathered with [ngGeolocation](https://github.com/ninjatronic/ngGeolocation).

If the geolocation fails, or is denied by the user, a default location is set and used to obtain the astronomy information.


####Factory
The data for the moon phase is gathered in a [factory](https://github.com/kencrocken/lunar_phase/blob/master/src/app/astronomy.js) using ngResource from the [Wunderground API astronomy endpoint](http://www.wunderground.com/weather/api/d/docs?d=data/astronomy&MR=1). This returns a JSON object similar to the following:

```
{
  "response": {
  "version": "0.1",
  "termsofService": "http://www.wunderground.com/weather/api/d/terms.html",
  "features": {
  "astronomy": 1
  }
  },
  "moon_phase": {
  "percentIlluminated": "81",
  "phaseofMoon": "Waning Gibbous",
  "ageOfMoon": "19",
  "current_time": {
  "hour": "9",
  "minute": "56"
  },
  "sunrise": {
  "hour": "7",
  "minute": "01"
  },
  "sunset": {
  "hour": "16",
  "minute": "56"
  }
  }
}
```
###### Note the Wunderground API documentation does not accurately describe the JSON object returned - namely, "phaseOfMoon" is not reflected in the docs.


####Directive
The moon phase is calculated and drawn using [js-planet-phase](https://github.com/codebox/js-planet-phase).

The library is wrapped in a [directive](https://github.com/kencrocken/lunar_phase/blob/master/src/app/moonPhase.js) with the arguments and options passed as attributes.

```
<moon percent-illum="{expression}" wax-wane="{expression}" diameter="{expression}" shadow-colour="{expression}" light-colour="{expression}" ng-if="{expression}">
</moon>
```

In order to wait for the data to be handled by the [controller](https://github.com/kencrocken/lunar_phase/blob/master/src/app/main/main.controller.js), `ng-if="{expression}"` was added to the element.

###Background
The starfield background is based on this [Codepen](http://codepen.io/saransh/pen/BKJun).  The Codepen is based on SASS and uses Compass.

This project used [LESS](https://github.com/kencrocken/lunar_phase/blob/master/src/app/index.less).  Some refactoring was needed.  Mixins to create random numbers and to concatenate the random numbers to the box shadow were developed after some googling.
