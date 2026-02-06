import { useState } from 'react';

import { fetchMoonData } from '../Service/moonData.service';

import type { Location, MoonApi } from '../Types/moonApi.types';

export const useMoonData = () => {
  const [isFetching, setFetchingData] = useState<boolean>(false);
  const [moonData, setMoonData] = useState<MoonApi>();
  const [error, setError] = useState<string>();
  const triggerFetchMoonData = (currentDate: string, coords?: Location) => {
    const options = {
      latitude: `${coords?.latitude}` || '',
      longitude: `${coords?.longitude}` || '',
      'current-date': currentDate,
    };

    const fetchData = async () => {
      setFetchingData(true);
      try {
        const result = await fetchMoonData(options);
        setMoonData(result);
      } catch (error: unknown) {
        const handleUnknownError = (error: unknown): string => {
          if (error instanceof Error) {
            return error.message; 
          }
          return "An unknown error occurred.";
        };
        setError(handleUnknownError(error));
      } finally {
        setFetchingData(false);
      }
    };

    if (coords !== undefined && currentDate) {
      fetchData();
    }
  }

  return { triggerFetchMoonData, isFetching, moonData, error };
};
