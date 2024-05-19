import { useEffect, useState } from "react";



interface LocationDetails {
  latitude: number;
  longitude: number;
  placeName: string;
}

export const useGeolocation = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationDetails | null>(
    null
  );


  useEffect(() => {
    (async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
      } catch (_) {
        console.error("Geolocation error :", _);
      }
    })();
  }, []);

  const getCurrentLocation = (): Promise<LocationDetails> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const placeName = await getPlaceName(latitude, longitude);
          resolve({ latitude, longitude, placeName });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20_000,
          maximumAge: 0
        }
      );
    });
  };

  const getPlaceName = async (latitude: number, longitude: number): Promise<string> => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const data = await response.json();
    return data.address.road;
  };

  const getRandomOffset = (): number => {
    const offset = 0.01;
    return (Math.random() - 0.5) * 2 * offset;
  };

  const getRandomLocationDetails = async (latitude: number, longitude: number): Promise<LocationDetails> => {
    const latOffset = getRandomOffset();
    const lngOffset = getRandomOffset();

    const newLatitude = latitude + latOffset;
    const newLongitude = longitude + lngOffset;
    const placeName = await getPlaceName(newLatitude, newLongitude);

    return { latitude: newLatitude, longitude: newLongitude, placeName };
  };

  return {
    currentLocation,
    getRandomLocationDetails,
    getCurrentLocation
  }
};
