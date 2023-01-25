import { DashboardLayout } from '@/layouts';
import { Box } from '@mui/material';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';
import { useFormik } from 'formik';
import { initLocationData } from '@/_mock/locations';
import { LocationType } from '@/types';

const LocationsById = () => {
  const locationFormik = useFormik<LocationType>({
    initialValues: initLocationData,
    onSubmit: async (values) => {
      console.log(values);
      // await authorize({ variables: { ...values } });
      //TODO Create Gallery
    },
  });
  return (
    <DashboardLayout title={'Locations'}>
      <Box component="form" onSubmit={locationFormik.handleSubmit}>
        <LocationDetailHeader name={initLocationData.name} isEditable={true} />
        <UIFlexSpaceBox sx={{ gap: '20px' }}>
          <LocationsDetailCarouselEditCard />
          <LocationsDetailInfoEditCard locationFormik={locationFormik} />
        </UIFlexSpaceBox>
      </Box>
    </DashboardLayout>
  );
};

export default LocationsById;
