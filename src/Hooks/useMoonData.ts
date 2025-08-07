import { useEffect, useState } from 'react';

import { fetchMoonData } from '../Service/moonData.service';

import type { Location, MoonApi } from '../Types/moonApi.types';

export const useMoonData = (currentDate: string, coords?: Location) => {
  const [isFetching, setFetchingData] = useState<boolean>(true);
  const [moonData, setMoonData] = useState<MoonApi>();
  const [error, setError] = useState<string>();
  console.log(moonData?.moon.major_phase);
  useEffect(() => {
    const options = {
      latitude: `${coords?.latitude}` || '',
      longitude: `${coords?.longitude}` || '',
      'current-date': currentDate,
    };

    const fetchData = async () => {
      try {
        const result = await fetchMoonData(options);
        setMoonData(result);
        setFetchingData(false);
      } catch (error: any) {
        setError(error.message);
        setFetchingData(false);
      }
    };

    if (coords !== undefined && currentDate) {
      fetchData();
    }
  }, [coords, currentDate]);
  console.log('useMoonData', { isFetching, moonData, error });
  return { isFetching, moonData, error };
};
