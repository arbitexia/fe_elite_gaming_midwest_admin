import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { UIFlexCenterBox, UIFlexWrapBox } from '@/components/UI';
import { LocationsHeader, LocationsCard } from '@/modules/Locations';
import { hasElInArray } from '@/libs/data-helper';
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
      <Box
        component={hasElInArray(locations) ? UIFlexWrapBox : UIFlexCenterBox}
        sx={{ gap: '26px', py: '40px' }}
      >
        {hasElInArray(locations)
          ? locations.map((item) => {
              return <LocationsCard key={item.id} item={item} />;
            })
          : 'We dont have locations yet. please create one!'}
      </Box>
    </DashboardLayout>
  );
};

export default LocationsPage;
