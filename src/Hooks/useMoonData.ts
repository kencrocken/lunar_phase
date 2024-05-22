import { useEffect, useState } from "react";
import type { Location, Moon as MoonAPIData, MoonApi } from "../moonApi.types";

export const useMoonData = (coords: Location) => {
  const [isFetching, setFetchingData] = useState<boolean>(true);
  const [moonData, setMoonData] = useState<MoonAPIData>();
  const [error, setError] = useState<string>();
  
  const url = 'https://moon-phase.p.rapidapi.com/advanced';


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_MOON_API_KEY || '',
        'X-RapidAPI-Host': 'moon-phase.p.rapidapi.com'
      },
    };

    const fetchData = async () => {
    try {
      // Default to Baltimore, MD
      const latitude = coords?.latitude ? coords.latitude : "39.0963965";
      const longitude = coords?.longitude ? coords.longitude : "-76.8590672";
      const response = await fetch(`${url}?lat=${latitude}&lon=${longitude}`, options);
      const result: MoonApi = await response.json();
      setMoonData(result.moon); 
      setFetchingData(false);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
      setFetchingData(false);
    } 
  };
  fetchData();
  }, [coords.latitude, coords.longitude])


  return { isFetching, moonData, error }
};