import { UIContainer } from '@/components/UI';
import { RequestsHeader, RequestTable } from '@/modules/Requests';
import { DashboardLayout } from '@/layouts';

const Requests = () => {
  return (
    <DashboardLayout title="Locations">
      <UIContainer sx={{ minHeight: 'calc(100vh - 86px)' }}>
        <RequestsHeader />
        <RequestTable />
      </UIContainer>
    </DashboardLayout>
  );
};

export default Requests;
