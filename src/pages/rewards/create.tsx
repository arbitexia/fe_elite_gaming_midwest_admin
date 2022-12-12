import { DashboardLayout } from '@/layouts';
import { UIFlexSpaceBox } from '@/components/UI';
import {
  RewardsDetailHeader,
  RewardsDetailCarouselEditCard,
  RewardsDetailInfoEditCard,
} from '@/modules/Rewards';

const RewardsCreate = () => {
  const rewardsItem = {
    id: 0,
    name: '',
    urls: [],
    location: {
      name: '',
      coordinates: { lat: 0, lng: 0 },
      id: 0,
      location: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
      },
      status: true,
      type: '',
      urls: [],
    },
    point: 0,
    short: '',
    description: '',
    amount: 0,
    status: '',
    createdAt: '',
  };
  return (
    <DashboardLayout title={rewardsItem ? rewardsItem.name : 'Rewards'}>
      {rewardsItem && (
        <>
          <RewardsDetailHeader name={rewardsItem.name} isEditable={true} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <RewardsDetailCarouselEditCard rewardsItem={rewardsItem} />
            <RewardsDetailInfoEditCard rewardsItem={rewardsItem} />
          </UIFlexSpaceBox>
        </>
      )}
    </DashboardLayout>
  );
};

export default RewardsCreate;
