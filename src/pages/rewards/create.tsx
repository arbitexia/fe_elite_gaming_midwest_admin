import { productMockData } from '@/_mock/product';
import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselEditCard,
  RewardsDetailInfoEditCard,
} from '@/modules/Rewards';

const RewardsCreate = () => {
  return (
    <DashboardLayout title={productMockData ? productMockData.name : 'Rewards'}>
      {productMockData && (
        <>
          <RewardsDetailHeader name={productMockData.name} isEditable={true} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselEditCard productItem={productMockData} />
            <RewardsDetailInfoEditCard productItem={productMockData} />
          </UIFlexSpaceBox>
        </>
      )}
    </DashboardLayout>
  );
};

export default RewardsCreate;
