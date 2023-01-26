import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselCard,
  LocationsDetailInfoCard,
  LocationDetailRewardTable,
} from '@/modules/Locations';
import { LocationType } from '@/types';
import { useLocation } from '@/hooks';

const LocationsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { onGetLocationById } = useLocation();
  const [locationItem, setLocationItem] = useState<LocationType | undefined>(
    undefined
  );
  useEffect(() => {
    setLocationItem(onGetLocationById(parseInt(id as string)));
  }, [id]);
  return (
    <DashboardLayout title={locationItem ? locationItem.name : 'Locations'}>
      {locationItem && (
        <>
          <LocationDetailHeader name={locationItem.name} isEditable={false} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <LocationsDetailCarouselCard />
            <LocationsDetailInfoCard locationItem={locationItem} />
          </UIFlexSpaceBox>
          <LocationDetailRewardTable />
        </>
      )}
    </DashboardLayout>
  );
};

export default LocationsById;
