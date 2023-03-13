import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppToast } from '@/providers';
import {
  getLocation,
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  resetLocationMessage,
  locationSelector,
  setGalleries,
} from '@/redux/slices';
import { Location } from '@/types';
import { useAppSelector, useAppDispatch } from './redux';

export const useLocation = () => {
  const appToast = useAppToast();
  const { locations, pageInfo, loading, message, error } =
    useAppSelector(locationSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loading) return;
    if (message) appToast({ severity: 'success', message: message });
    if (error) appToast({ severity: 'error', message: error });
    dispatch(resetLocationMessage(null));
  }, [loading]);

  const onGetLocationById = (id: number) => {
    const location = locations.find(
      (location: Location.Data) => location.id === id
    );
    dispatch(setGalleries(location?.gallery ?? []));
    return location;
  };

  const onLocationSelect = async (id: number) => {
    await dispatch(getLocation({ id }));
  };

  const onGetLocations = async (param: Location.Filter) => {
    await dispatch(getLocations(param));
  };

  const onCreateLocation = async (param: Location.Body): Promise<Location> => {
    const { payload }: PayloadAction<unknown> = await dispatch(
      createLocation(param)
    );
    return payload as Location;
  };

  const onUpdateLocation = async (param: Location.Param & Location.Body) => {
    await dispatch(updateLocation(param));
  };

  const onDeleteLocation = async (id: number) => {
    await dispatch(deleteLocation({ id }));
  };

  return {
    locations,
    pageInfo,
    onGetLocationById,
    onLocationSelect,
    onGetLocations,
    onCreateLocation,
    onUpdateLocation,
    onDeleteLocation,
  };
};
