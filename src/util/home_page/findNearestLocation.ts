import { Location, UserLocation } from '@/types/home_page/types';
import getDistance from './getDistance';

export default function findNearestLocation(userLocation: UserLocation, data: Location[] | null): Location | null {
  let minDistance = Infinity;
  let nearestLocation = null;

  data?.forEach((location) => {
    const distance = getDistance(
      userLocation.lat,
      userLocation.lng,
      location.toilet_latitude,
      location.toilet_longitude,
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestLocation = location;
    }
  });

  return nearestLocation;
}
