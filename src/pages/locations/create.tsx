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
import { useLocation } from '@/hooks';
import { initLocationData } from '@/_mock/locations';

const LocationCreatePage = () => {
  const { onCreateLocation } = useLocation();
  const locationFormik = useFormik<LocationType>({
    initialValues: initLocationData,
    onSubmit: async (values: LocationType) => {
      onCreateLocation({ input: values } as CreateLocationParam);
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
