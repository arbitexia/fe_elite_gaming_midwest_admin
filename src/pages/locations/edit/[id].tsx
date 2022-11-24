import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';
import { locationsData } from '@/_mock/locations';
import { LocationType } from '@/types';

const LocationsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [locationItem, setLocationItem] = useState<
    LocationType | undefined | null
  >(null);
  useEffect(() => {
    setLocationItem(
      locationsData.find((item) => item.id === parseInt(id as string))
    );
  }, [id]);
  return (
    <DashboardLayout title={locationItem ? locationItem.name : 'Locations'}>
      {locationItem && (
        <>
          <LocationDetailHeader name={locationItem.name} isEditable={true} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <LocationsDetailCarouselEditCard locationItem={locationItem} />
            <LocationsDetailInfoEditCard locationItem={locationItem} />
          </UIFlexSpaceBox>
        </>
      )}
    </DashboardLayout>
  );
};

export default LocationsById;
