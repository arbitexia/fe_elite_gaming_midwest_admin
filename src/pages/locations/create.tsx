import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/layouts';
import { Box } from '@mui/material';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';
import { useFormik } from 'formik';
import { LocationType, CreateLocationParam } from '@/types';
import { useLocation, useAsset } from '@/hooks';
import { initLocationData } from '@/_mock/locations';

const LocationCreatePage = () => {
  const { onCreateLocation } = useLocation();
  const { onSetGalleries, onSaveGallery } = useAsset();
  const [isReady, setIsReady] = useState(true);
  useEffect(() => {
    if (!isReady) return;
    onSetGalleries([]);
    setIsReady(false);
  }, [isReady]);
  const locationFormik = useFormik<LocationType>({
    initialValues: initLocationData,
    onSubmit: async (values: LocationType) => {
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
