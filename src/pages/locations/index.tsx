import { useState, useEffect } from 'react';
import { UIFlexWrapBox } from '@/components/UI';
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
      <LocationsHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <UIFlexWrapBox sx={{ gap: '26px', py: '40px' }}>
        {locationList.map((item) => {
          return <LocationsCard key={item.id} item={item} />;
        })}
      </UIFlexWrapBox>
    </DashboardLayout>
  );
};

export default LocationsPage;
