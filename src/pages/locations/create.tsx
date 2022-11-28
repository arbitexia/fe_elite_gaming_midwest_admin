import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  LocationDetailHeader,
  LocationsDetailCarouselEditCard,
  LocationsDetailInfoEditCard,
} from '@/modules/Locations';

const LocationsById = () => {
  const locationItem = {
    name: '',
    coordinates: { lat: 0, lng: 0 },
    id: 0,
    location: '',
    status: false,
    type: '',
    urls: [],
  };
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
