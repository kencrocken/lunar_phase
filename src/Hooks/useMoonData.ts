import { useEffect, useState } from "react";

import { fetchMoonData } from '../Service/moonData.service';

import type { Location } from "../Types/moonApi.types";
import type { NavalMoonAPI } from "../Types/navalApi.types";

export const useMoonData = (currentDate: string, coords?: Location) => {
  const [isFetching, setFetchingData] = useState<boolean>(true);
  const [moonData, setMoonData] = useState<NavalMoonAPI>();
  const [error, setError] = useState<string>();
  

  
  useEffect(() => {
    const options = {
      'latitude': `${coords?.latitude}` || '',
      'longitude': `${coords?.longitude}` || '',
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

    if (coords !== undefined && currentDate){
      fetchData();
    }
  }, [coords, currentDate]);
  return { isFetching, moonData, error };
};