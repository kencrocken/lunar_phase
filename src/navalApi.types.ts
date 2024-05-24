export type NavalMoonAPI = {
    apiversion: string;
    geometry:   Geometry;
    properties: Properties;
    type:       string;
}

export type Geometry = {
    coordinates: number[];
    type:        string;
}

export type Properties = {
    data: Data;
}

export type Data = {
    closestphase: Closestphase;
    curphase:     string;
    day:          number;
    day_of_week:  string;
    fracillum:    string;
    isdst:        boolean;
    label:        null;
    month:        number;
    moondata:     Ndatum[];
    sundata:      Ndatum[];
    tz:           number;
    year:         number;
}

export type Closestphase = {
    day:   number;
    month: number;
    phase: string;
    time:  string;
    year:  number;
}

export type Ndatum = {
    phen: string;
    time: string;
}