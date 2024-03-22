import { Location, UserLocation } from '@/types/home_page/types';
import getDistance from './getDistance';

export default function findNearestLocation({
  userLocation,
  data,
}: {
  userLocation: UserLocation;
  data: Location[] | null;
}): Location | null {
  let minDistance = Infinity;
  let nearestLocation = null;

  data?.forEach((location) => {
    const distance = getDistance({
      lat1: userLocation.lat,
      lon1: userLocation.lng,
      lat2: location.toilet_latitude,
      lon2: location.toilet_longitude,
    });

    if (distance < minDistance) {
      minDistance = distance;
      nearestLocation = location;
    }
  });

  return nearestLocation;
}
