import { useState, useEffect } from 'react';
import { UIContainer, UIFlexWrapBox } from '@/components/UI';
import { LocationsHeader, LocationsCard } from '@/modules/Locations';
import { DashboardLayout } from '@/layouts';
import { locationsData } from '@/_mock/locations';
import { LocationType } from '@/types';

const LocationsPage = () => {
  const [locationList, setLocationList] = useState<LocationType[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setLocationList(() => {
      return locationsData.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    });
  }, [searchValue]);
  return (
    <DashboardLayout title="Locations">
      <UIContainer sx={{ minHeight: 'calc(100vh - 86px)' }}>
        <LocationsHeader
          searchValue={searchValue}
          onValueChange={(value) => setSearchValue(value)}
        />
        <UIFlexWrapBox sx={{ gap: '26px', py: '60px' }}>
          {locationList.map((item) => {
            return <LocationsCard key={item.id} item={item} />;
          })}
        </UIFlexWrapBox>
      </UIContainer>
    </DashboardLayout>
  );
};

export default LocationsPage;
