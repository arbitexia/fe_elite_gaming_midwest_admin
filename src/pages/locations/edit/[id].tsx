import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';
import { Location } from '@/types';
import { useFormik } from 'formik';
import { useAsset, useLocation } from '@/hooks';
import { useAppToast } from '@/providers';
import { LocationSchema } from '@/libs/yupSchema';

const LocationsById = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { id } = router.query;
  const [locationItem, setLocationItem] = useState<Location.Data | undefined>(
    undefined
  );
  const [errorMsg, setErrorMsg] = useState<string>();

  const { onGetLocationById, onUpdateLocation } = useLocation();
  const { onSaveGallery } = useAsset();

  const initLocationData: Location.Data = {
    name: '',
    coords: { lat: 0, lng: 0 },
    id: 0,
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
    status: '',
    type: '',
    description: '',
  };

  const locationFormik = useFormik<Location.Data>({
    initialValues: locationItem ?? initLocationData,
    validationSchema: LocationSchema,
    onSubmit: async (values) => {
      let params: Location.Param & Location.Body = {
        id: values.id,
        input: {
          name: values.name,
          coords: values.coords,
          address: values.address,
          description: values.description || '',
          type: values.type,
          status: values.status,
        },
      };

      onUpdateLocation(params);
      onSaveGallery(values.id, 'LOCATION');
      router.push('/locations');
      appToast({
        severity: 'success',
        message: 'Successfully, game placee has been updated!',
      });
    },
  });

  useEffect(() => {
    if (errorMsg) {
      appToast({
        severity: 'error',
        message: errorMsg,
      });
      setErrorMsg(undefined);
    }
  }, [errorMsg]);

  useEffect(() => {
    const location = onGetLocationById(parseInt(id as string));
    setLocationItem(location);
    locationFormik.setValues(location ?? initLocationData);
  }, [id]);

  const handleClickUpdate = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    locationFormik.handleSubmit();
    if (JSON.stringify(locationFormik.errors) !== '{}') {
      if (locationFormik.errors.status) {
        setErrorMsg(locationFormik.errors.status);
      } else if (locationFormik.errors.name) {
        setErrorMsg(locationFormik.errors.name);
      } else if (locationFormik.errors.type) {
        setErrorMsg(locationFormik.errors.type);
      } else if (locationFormik.errors.address) {
        const errorAddrKey = Object.keys(
          locationFormik.errors.address
        )[0] as keyof typeof locationFormik.errors.address;
        setErrorMsg(
          (
            locationFormik.errors.address[errorAddrKey] as string | undefined
          )?.replaceAll('address.', '')
        );
      }
      return;
    }
    locationFormik.handleSubmit();
  };
  return (
    <DashboardLayout title={locationItem ? locationItem.name : 'Locations'}>
      {locationItem && (
        <Box component="form" onSubmit={handleClickUpdate}>
          <LocationDetailHeader name={locationItem.name} isEditable={true} />
          <Divider sx={{ my: '18px' }} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <LocationsDetailCarouselEditCard />
            {locationItem && (
              <LocationsDetailInfoEditCard locationFormik={locationFormik} />
            )}
          </UIFlexSpaceBox>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default LocationsById;
