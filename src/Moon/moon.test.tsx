import { render, screen, waitFor } from '@testing-library/react';
import { Moon } from './moon';
import { MOON_DEFAULTS } from './moon.constants';
import { MoonApi } from '../Types/moonApi.types';
const mock_MoonData = {
  timestamp: 1754543456,
  datestamp: 'Thu, 07 Aug 2025 05:10:56 +0000',
  plan: 'PRO',
  sun: {
    sunrise: 1754547000,
    sunrise_timestamp: '06:10',
    sunset: 1754597700,
    sunset_timestamp: '20:15',
    solar_noon: '13:13',
    day_length: '14:05',
    position: {
      altitude: -34.054754,
      azimuth: 359.105658,
      distance: 151743546.311623,
    },
    next_solar_eclipse: {
      timestamp: 1758476584,
      datestamp: 'Sun, 21 Sep 2025 17:43:04 +0000',
      type: 'Partial Solar Eclipse',
      visibility_regions: 's Pacific, New Zealand, Antarctica',
    },
  },
  moon: {
    phase: 0.448142856811387,
    phase_name: 'full moon',
    major_phase: 'Full Moon',
    stage: 'waxing',
    illumination: '97%',
    age_days: 12,
    lunar_cycle: '44.81%',
    emoji: '🌕',
    zodiac: {
      sun_sign: 'Leo',
      moon_sign: 'Capricorn',
    },
    moonrise: '19:34',
    moonrise_timestamp: 1754595240,
    moonset: '04:01',
    moonset_timestamp: 1754539260,
    next_lunar_eclipse: {
      timestamp: 1757261578,
      datestamp: 'Sun, 07 Sep 2025 16:12:58 +0000',
      type: 'Total Lunar Eclipse',
      visibility_regions: 'Europe, Africa, Asia, Australia',
    },
    detailed: {
      position: {
        altitude: -52.149475,
        azimuth: 30.886941,
        distance: 387964.1022,
        parallactic_angle: -19.51551,
        phase_angle: 161.33,
      },
      visibility: {
        visible_hours: 0,
        best_viewing_time: null,
        visibility_rating: 'Excellent',
        illumination: '97.37%',
        viewing_conditions: {
          phase_quality: 'Good for observing surface detail along terminator line',
          recommended_equipment: {
            filters: 'No filters needed',
            telescope: '4-inch or larger recommended',
            best_magnification: 'High magnification (100-200x) for crater detail',
          },
        },
      },
      upcoming_phases: {
        new_moon: {
          last: {
            timestamp: 1753433880,
            datestamp: 'Fri, 25 Jul 2025 08:58:00 +0000',
            days_ago: 12,
          },
          next: {
            timestamp: 1755939480,
            datestamp: 'Sat, 23 Aug 2025 08:58:00 +0000',
            days_ahead: 16,
          },
        },
        first_quarter: {
          last: {
            timestamp: 1753972320,
            datestamp: 'Thu, 31 Jul 2025 14:32:00 +0000',
            days_ago: 6,
          },
          next: {
            timestamp: 1756477920,
            datestamp: 'Fri, 29 Aug 2025 14:32:00 +0000',
            days_ahead: 22,
          },
        },
        full_moon: {
          last: {
            timestamp: 1752123300,
            datestamp: 'Thu, 10 Jul 2025 04:55:00 +0000',
            days_ago: 28,
            name: 'Buck Moon',
            description: 'When male deer begin to grow their new antlers.',
          },
          next: {
            timestamp: 1754628900,
            datestamp: 'Fri, 08 Aug 2025 04:55:00 +0000',
            days_ahead: 0,
            name: 'Sturgeon Moon',
            description: 'Named for the abundance of sturgeon in the Great Lakes.',
          },
        },
        last_quarter: {
          last: {
            timestamp: 1752831000,
            datestamp: 'Fri, 18 Jul 2025 09:30:00 +0000',
            days_ago: 19,
          },
          next: {
            timestamp: 1755336600,
            datestamp: 'Sat, 16 Aug 2025 09:30:00 +0000',
            days_ahead: 9,
          },
        },
      },
      illumination_details: {
        percentage: 97.37,
        visible_fraction: 0.9737,
        phase_angle: 161.33,
      },
    },
    events: {
      moonrise_visible: false,
      moonset_visible: true,
      optimal_viewing_period: {
        start_time: '21:15',
        end_time: '01:15',
        duration_hours: 4,
        viewing_quality: 'Good for crater observation along terminator',
        recommendations: [
          'High in sky during evening hours',
          'Excellent time to observe crater shadows along terminator line',
          'Medium to high magnification recommended for detail',
        ],
      },
    },
  },
};

describe('Moon Component with less than 50% illumination', () => {
  const mock_MoonData_lessThan50: MoonApi = {
    ...mock_MoonData,
    major_phase: 'Waxing Crescent',
    illumination: '45%',
  } as MoonApi;

  test('renders moon component with correct outer color', async () => {
    render(<Moon phaseName='Waxing Crescent' illumination='45%' />);
    await waitFor(() => {
      const outerBox = screen.getByTestId('outer-box');
      expect(outerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.lightColor });
    });
  });

  test('renders moon component with correct inner color', () => {
    render(<Moon phaseName='Waxing Crescent' illumination='45%' />);
    const innerBox = screen.getByTestId('inner-box');
    expect(innerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.shadowColor });
  });
});

describe('Moon Component with greater than 50% illumination', () => {
  test('renders moon component with correct outer color', () => {
    render(<Moon phaseName="Waxing Gibbous" illumination="55%" />);
    const outerBox = screen.getByTestId('outer-box');
    expect(outerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.shadowColor });
  });

  test('renders moon component with correct inner color', () => {
    render(<Moon phaseName="Waxing Gibbous" illumination="55%" />);
    const innerBox = screen.getByTestId('inner-box');

    expect(innerBox).toHaveStyle({ backgroundColor: MOON_DEFAULTS.lightColor });
  });
});

test('renders moon component with correct diameter', () => {
  render(<Moon phaseName="Waxing Crescent" illumination="50%" />);
  const outerBox = screen.getByTestId('outer-box');
  expect(outerBox).toHaveStyle({ height: `${MOON_DEFAULTS.diameter}px`, width: `${MOON_DEFAULTS.diameter}px` });
});
