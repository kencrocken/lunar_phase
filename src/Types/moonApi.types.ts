/**
 * MoonApi is pretty nice and returns a lot of information about the moon.
 * But, there was an issue with timezones and the data was not accurate.
 * Still keeping it around in case it gets fixed.
 */

export type MoonApi = {
    timestamp:   number;
    datestamp:   string;
    sun:         Sun;
    moon:        Moon;
    moon_phases: MoonPhases;
    location:    Location;
}

export type Location = {
    latitude:  number;
    longitude: number;
}

export type Moon = {
    phase:                  number;
    phase_name:             string;
    stage:                  string;
    illumination:           string;
    age_days:               number;
    lunar_cycle:            string;
    emoji:                  string;
    zodiac:                 Zodiac;
    moonrise:               string;
    moonrise_timestamp:     number;
    moonset:                string;
    moonset_timestamp:      number;
    moon_altitude:          number;
    moon_distance:          number;
    moon_azimuth:           number;
    moon_parallactic_angle: number;
    next_lunar_eclipse:     NextArEclipse;
}

export type NextArEclipse = {
    timestamp:          number;
    datestamp:          string;
    type:               string;
    visibility_regions: string;
}

export type Zodiac = {
    sun_sign:  string;
    moon_sign: string;
}

export type MoonPhases = {
    new_moon:      FirstQuarter;
    first_quarter: FirstQuarter;
    full_moon:     FullMoon;
    last_quarter:  FirstQuarter;
}

export type FirstQuarter = {
    last: FirstQuarterLast;
    next: Next;
}

export type FirstQuarterLast = {
    timestamp: number;
    datestamp: string;
    days_ago:  number;
}

export type Next = {
    timestamp:  number;
    datestamp:  string;
    days_ahead: number;
}

export type FullMoon = {
    last: NextClass;
    next: NextClass;
}

export type NextClass = {
    timestamp:   number;
    datestamp:   string;
    days_ago?:   number;
    name:        string;
    description: string;
    days_ahead?: number;
}

export type Sun = {
    sunrise:            number;
    sunrise_timestamp:  string;
    sunset:             number;
    sunset_timestamp:   string;
    solar_noon:         string;
    day_length:         string;
    sun_altitude:       number;
    sun_distance:       number;
    sun_azimuth:        number;
    next_solar_eclipse: NextArEclipse;
}