import { useState, useEffect } from "react";
import type { Location } from "../moonApi.types";

export const useGeolocation = () => {
  const [coords, setCoords] = useState<Location>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: Math.round(position.coords.latitude * 1000) / 1000,
          longitude: Math.round(position.coords.longitude * 1000) / 1000,
        });
      },
      (error: any) => {
        setCoords({ latitude: 39.29, longitude: -76.612 }) // Default to Baltimore, MD
        setError(error.message);
      }
    );
  }, []);

  return { coords, error };
}