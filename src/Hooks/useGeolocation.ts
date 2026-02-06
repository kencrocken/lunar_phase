import { useState } from "react";
import { getGeolocation } from "../Service/geolocation.service";

export const useGeolocation = () => {
  const [isFetching, setFetchingLocation] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const triggerGeolocation = () => {
    setFetchingLocation(true);
    return getGeolocation()
      .then((position) => {
        return {
          latitude: Math.round(position.coords.latitude * 1000) / 1000,
          longitude: Math.round(position.coords.longitude * 1000) / 1000,
          ok: true,
        };
      })
      .catch((error: unknown) => {
        const handleUnknownError = (error: unknown): string => {
          if (error instanceof Error) {
            return error.message; 
          }
          return "An unknown error occurred.";
        };
        setError(handleUnknownError(error));  
        return { latitude: 39.29, longitude: -76.612, ok: false }; // Default to Baltimore, MD
      })
      .finally(() => {
        setFetchingLocation(false);
      });
  }

  return { triggerGeolocation, error, isFetching };
}