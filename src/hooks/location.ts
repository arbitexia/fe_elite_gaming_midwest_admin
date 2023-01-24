import { useAppToast } from '@/providers';
import {
  getLocation,
  getLocations,
  resetLocationMessage,
  locationSelector,
} from '@/redux/slices';

import { GetLocationsParam, LocationType } from '@/types';
import { useEffect } from 'react';
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
    return locations.find((location: LocationType) => location.id === id);
  };

  const onLocationSelect = async (id: number) => {
    await dispatch(getLocation({ locationId: id }));
  };

  const onGetLocations = async (param: GetLocationsParam) => {
    await dispatch(getLocations(param));
  };

  return {
    locations,
    pageInfo,
    onGetLocationById,
    onLocationSelect,
    onGetLocations,
  };
};
