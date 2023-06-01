import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box, Divider } from '@mui/material';
import { useLocation, useAsset } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';
import { Location } from '@/types';
import { useAppToast } from '@/providers';
import { LocationSchema } from '@/libs/yupSchema';

const LocationCreatePage = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { onCreateLocation } = useLocation();
  const { onSetGalleries, onSaveGallery } = useAsset();
  const [isReady, setIsReady] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    if (!isReady) return;
    onSetGalleries([]);
    setIsReady(false);
  }, [isReady]);

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
    initialValues: initLocationData,
    validationSchema: LocationSchema,
    onSubmit: async (values) => {
      const params: Location.Body = {
        input: {
          name: values.name,
          coords: values.coords,
          address: values.address,
          description: values.description || '',
          type: values.type,
          status: values.status,
        },
      };
      const location = await onCreateLocation(params);
      onSaveGallery(location.id, 'LOCATION');
      router.push('/locations');
      appToast({
        severity: 'success',
        message: 'Successfully, new game place has been registered!',
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

  const handleClickSave = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <DashboardLayout title={'Locations'}>
      <Box component="form" onSubmit={handleClickSave}>
        <LocationDetailHeader
          name={locationFormik.values.name}
          isEditable={true}
        />
        <Divider sx={{ my: '18px' }} />
        <UIFlexSpaceBox sx={{ gap: '20px' }}>
          <LocationsDetailCarouselEditCard />
          <LocationsDetailInfoEditCard locationFormik={locationFormik} />
        </UIFlexSpaceBox>
      </Box>
    </DashboardLayout>
  );
};

export default LocationCreatePage;
