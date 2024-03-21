import { ChangeEvent } from 'react';

export interface Location {
  toilet_address: string;
  toilet_baby_diaper: string | null;
  toilet_id: number;
  toilet_latitude: number;
  toilet_longitude: number;
  toilet_name: string;
  toilet_opening_hours: string | null;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface HomePageType {
  userLocation: UserLocation;
  filterData: Location[] | undefined;
  nearestLocation: Location | null;
}

export interface HomeSelectFormType {
  selectSee: string;
  selectGunGue: string;
  handleSelectCity(event: ChangeEvent<HTMLSelectElement>): void;
  handleSelectCounty(event: ChangeEvent<HTMLSelectElement>): void;
}
