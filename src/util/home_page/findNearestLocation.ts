import { Location, NearestLocation, UserLocation } from '@/types/home_page/types';
import getDistance from './getDistance';

export default function findNearestLocation({
  userLocation,
  data,
}: {
  userLocation: UserLocation;
  data: Location[] | null;
}): NearestLocation[] | null {
  let minDistance = Infinity;

  const nearestLocation: NearestLocation[] = [];

  data?.forEach((location) => {
    const distance = getDistance({
      lat1: userLocation.lat,
      lon1: userLocation.lng,
      lat2: location.toilet_latitude,
      lon2: location.toilet_longitude,
    });

    if (distance < minDistance) {
      minDistance = distance;

      nearestLocation.push({
        toilet_distance: distance,
        toilet_address: location.toilet_address,
        toilet_baby_diaper: location.toilet_baby_diaper,
        toilet_id: location.toilet_id,
        toilet_latitude: location.toilet_latitude,
        toilet_longitude: location.toilet_longitude,
        toilet_name: location.toilet_name,
        toilet_opening_hours: location.toilet_opening_hours,
      });
    }
  });

  return nearestLocation.reverse();
}
