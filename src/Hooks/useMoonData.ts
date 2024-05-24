import { useEffect, useState } from "react";
import type { Location } from "../moonApi.types";
import type { NavalMoonAPI } from "../navalApi.types";

export const useMoonData = (currentDate: string, coords?: Location) => {
  const [isFetching, setFetchingData] = useState<boolean>(true);
  const [moonData, setMoonData] = useState<NavalMoonAPI>();
  const [error, setError] = useState<string>();
  
  const url = 'https://ald76uu0g6.execute-api.us-east-1.amazonaws.com/project/lunarphase';
  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'latitude': `${coords?.latitude}` || '',
        'longitude': `${coords?.longitude}` || '',
        'current-date': currentDate,
      },
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMoonData(result); 
        setFetchingData(false);
      } catch (error: any) {
        console.error(error);
        setError(error.message as string);
        setFetchingData(false);
      } 
    };

    if (coords !== undefined && currentDate){
      fetchData();
    }
  }, [coords, currentDate]);
  return { isFetching, moonData, error };
};