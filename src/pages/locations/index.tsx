import { UIContainer, UIFlexWrapBox } from '@/components/UI';
import { LocationsHeader, LocationsCard } from '@/modules/Locations';
import { DashboardLayout } from '@/layouts';
import { locationsData } from '@/_mock/locations';

const Locations = () => {
  return (
    <DashboardLayout title="Locations">
      <UIContainer sx={{ minHeight: 'calc(100vh - 86px)' }}>
        <LocationsHeader />
        <UIFlexWrapBox sx={{ gap: '26px', py: '60px' }}>
          {locationsData.map((item) => {
            return <LocationsCard key={item.id} item={item} />;
          })}
        </UIFlexWrapBox>
      </UIContainer>
    </DashboardLayout>
  );
};

export default Locations;
