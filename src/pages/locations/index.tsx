import { useState, useEffect } from 'react';
import { UIFlexWrapBox } from '@/components/UI';
import { LocationsHeader, LocationsCard } from '@/modules/Locations';
import { DashboardLayout } from '@/layouts';
import { useLocation } from '@/hooks';

const LocationsPage = () => {
  const { locations, onGetLocations } = useLocation();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    onGetLocations({ filterBy: { search: searchValue } });
  }, [searchValue]);
  return (
    <DashboardLayout title="Locations">
      <LocationsHeader
        searchValue={searchValue}
        onValueChange={(value) => setSearchValue(value)}
      />
      <UIFlexWrapBox sx={{ gap: '26px', py: '40px' }}>
        {locations.map((item) => {
          return <LocationsCard key={item.id} item={item} />;
        })}
      </UIFlexWrapBox>
    </DashboardLayout>
  );
};

export default LocationsPage;
