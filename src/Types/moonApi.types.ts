/**
 * MoonApi is pretty nice and returns a lot of information about the moon.
 * But, there was an issue with timezones and the data was not accurate.
 * Still keeping it around in case it gets fixed.
 */

interface AstronomicalData {
  timestamp: number;
  datestamp: string;
  plan: string;
  sun: SunData;
  moon: MoonData;
}

interface SunData {
  sunrise: number;
  sunrise_timestamp: string;
  sunset: number;
  sunset_timestamp: string;
  solar_noon: string;
  day_length: string;
  position: CelestialPosition;
  next_solar_eclipse: SolarEclipse;
}

interface MoonData {
  phase: number;
  phase_name: string;
  major_phase: string;
  stage: string;
  illumination: string;
  age_days: number;
  lunar_cycle: string;
  emoji: string;
  zodiac: ZodiacSigns;
  moonrise: string;
  moonrise_timestamp: number;
  moonset: string;
  moonset_timestamp: number;
  next_lunar_eclipse: LunarEclipse;
  detailed: DetailedMoonData;
  events: MoonEvents;
}

interface CelestialPosition {
  altitude: number;
  azimuth: number;
  distance: number;
}

interface SolarEclipse {
  timestamp: number;
  datestamp: string;
  type: string;
  visibility_regions: string;
}

interface LunarEclipse {
  timestamp: number;
  datestamp: string;
  type: string;
  visibility_regions: string;
}

interface ZodiacSigns {
  sun_sign: string;
  moon_sign: string;
}

interface DetailedMoonData {
  position: DetailedMoonPosition;
  visibility: MoonVisibility;
  upcoming_phases: UpcomingPhases;
  illumination_details: IlluminationDetails;
}

interface DetailedMoonPosition extends CelestialPosition {
  parallactic_angle: number;
  phase_angle: number;
}

interface MoonVisibility {
  visible_hours: number;
  best_viewing_time: string | null;
  visibility_rating: string;
  illumination: string;
  viewing_conditions: ViewingConditions;
}

interface ViewingConditions {
  phase_quality: string;
  recommended_equipment: RecommendedEquipment;
}

interface RecommendedEquipment {
  filters: string;
  telescope: string;
  best_magnification: string;
}

interface UpcomingPhases {
  new_moon: PhaseData;
  first_quarter: PhaseData;
  full_moon: FullMoonPhaseData;
  last_quarter: PhaseData;
}

interface PhaseData {
  last: PhaseEvent;
  next: PhaseEvent;
}

interface PhaseEvent {
  timestamp: number;
  datestamp: string;
  days_ago?: number;
  days_ahead?: number;
}

interface FullMoonPhaseData extends PhaseData {
  last: FullMoonEvent;
  next: FullMoonEvent;
}

interface FullMoonEvent extends PhaseEvent {
  name?: string;
  description?: string;
}

interface IlluminationDetails {
  percentage: number;
  visible_fraction: number;
  phase_angle: number;
}

interface MoonEvents {
  moonrise_visible: boolean;
  moonset_visible: boolean;
  optimal_viewing_period: OptimalViewingPeriod;
}

interface OptimalViewingPeriod {
  start_time: string;
  end_time: string;
  duration_hours: number;
  viewing_quality: string;
  recommendations: string[];
}

// Export the main interface
export type { AstronomicalData as MoonApi };
export type Location = {
  latitude: number;
  longitude: number;
};
