import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';
import { initLocationData } from '@/_mock/locations';
import { LocationType, UpdateLocationParam } from '@/types';
import { useFormik } from 'formik';
import { useAsset, useLocation } from '@/hooks';

const LocationsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [locationItem, setLocationItem] = useState<LocationType | undefined>(
    undefined
  );
  const { onGetLocationById, onUpdateLocation } = useLocation();
  const { onSaveGallery } = useAsset();

  const locationFormik = useFormik<LocationType>({
    initialValues: locationItem ?? initLocationData,
    onSubmit: async (values) => {
      let params: UpdateLocationParam = {
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
    },
  });

  useEffect(() => {
    const location = onGetLocationById(parseInt(id as string));
    setLocationItem(location);
    locationFormik.setValues(location ?? initLocationData);
  }, [id]);
  return (
    <DashboardLayout title={locationItem ? locationItem.name : 'Locations'}>
      {locationItem && (
        <Box component="form" onSubmit={locationFormik.handleSubmit}>
          <LocationDetailHeader name={locationItem.name} isEditable={true} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <LocationsDetailCarouselEditCard />
            <LocationsDetailInfoEditCard locationFormik={locationFormik} />
          </UIFlexSpaceBox>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default LocationsById;
