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
import { LocationType } from '@/types';
import { useFormik } from 'formik';
import { useLocation } from '@/hooks';

const LocationsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [locationItem, setLocationItem] = useState<LocationType | undefined>(
    undefined
  );
  const { onGetLocationById } = useLocation();
  const locationFormik = useFormik<LocationType>({
    initialValues: locationItem ?? initLocationData,
    onSubmit: async (values) => {
      console.log(values);
      // await authorize({ variables: { ...values } });
      //TODO Create Gallery
    },
  });

  useEffect(() => {
    setLocationItem(onGetLocationById(parseInt(id as string)));
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
