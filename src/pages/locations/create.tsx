import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import { initLocationData } from '@/_mock/locations';
import { useLocation, useAsset } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';
import { Location, CreateLocationParam } from '@/types';
import { useAppToast } from '@/providers';

const LocationCreatePage = () => {
  const router = useRouter();
  const appToast = useAppToast();
  const { onCreateLocation } = useLocation();
  const { onSetGalleries, onSaveGallery } = useAsset();
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    onSetGalleries([]);
    setIsReady(false);
  }, [isReady]);

  const locationFormik = useFormik<Location>({
    initialValues: initLocationData,
    onSubmit: async (values: Location) => {
      let params: CreateLocationParam = {
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
        message: 'Successfully, new game placee has been registered!',
      });
    },
  });

  return (
    <DashboardLayout title={'Locations'}>
      <Box component="form" onSubmit={locationFormik.handleSubmit}>
        <LocationDetailHeader
          name={locationFormik.values.name}
          isEditable={true}
        />
        <UIFlexSpaceBox sx={{ gap: '20px' }}>
          <LocationsDetailCarouselEditCard />
          <LocationsDetailInfoEditCard locationFormik={locationFormik} />
        </UIFlexSpaceBox>
      </Box>
    </DashboardLayout>
  );
};

export default LocationCreatePage;
