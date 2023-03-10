import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselEditCard,
  RewardsDetailInfoEditCard,
} from '@/modules/Rewards';
import { RewardItemType, ProductStatus } from '@/types';

const RewardsCreate = () => {
  const initRewardsItem: RewardItemType = {
    id: 0,
    name: '',
    urls: [],
    locationId: 0,
    location: {
      name: '',
      coords: { lat: 0, lng: 0 },
      id: 0,
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
      },
      status: 'OPEN',
      type: '',
    },
    point: 0,
    short: '',
    description: '',
    amount: 0,
    status: ProductStatus.AVAILABLE,
    createdAt: '',
  };
  return (
    <DashboardLayout title={initRewardsItem ? initRewardsItem.name : 'Rewards'}>
      {initRewardsItem && (
        <>
          <RewardsDetailHeader name={initRewardsItem.name} isEditable={true} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselEditCard rewardsItem={initRewardsItem} />
            <RewardsDetailInfoEditCard rewardsItem={initRewardsItem} />
          </UIFlexSpaceBox>
        </>
      )}
    </DashboardLayout>
  );
};

export default RewardsCreate;
