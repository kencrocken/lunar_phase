import { useState, useEffect } from "react";
import type { Location } from "../moonApi.types";

export const useGeolocation = () => {
  const [coords, setCoords] = useState<Location>({ latitude: 0, longitude: 0 });
  const [error, setError] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error: any) => {
        setError(error);
      }
    );
  }, []);

  return { coords, error };
}