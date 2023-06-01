import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselCard,
  LocationsDetailInfoCard,
  LocationDetailRewardTable,
  LocationDetailCustomerTable,
} from '@/modules/Locations';
import { Location } from '@/types';
import { useLocation } from '@/hooks';
import { Divider, Box } from '@mui/material';

const LocationsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { onGetLocationById } = useLocation();
  const [locationItem, setLocationItem] = useState<Location.Data | undefined>();

  useEffect(() => {
    setLocationItem(onGetLocationById(parseInt(id as string)));
  }, [id]);

  return (
    <DashboardLayout title={locationItem ? locationItem.name : 'Locations'}>
      {locationItem && (
        <Box>
          <LocationDetailHeader name={locationItem.name} isEditable={false} />
          <Divider sx={{ my: '18px' }} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <LocationsDetailCarouselCard />
            <LocationsDetailInfoCard locationItem={locationItem} />
          </UIFlexSpaceBox>
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <LocationDetailRewardTable />
            <LocationDetailCustomerTable />
          </UIFlexSpaceBox>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default LocationsById;
