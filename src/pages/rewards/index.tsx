import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import {
  UIFlexWrapBox,
  UIOptionMenuItem,
  UISelectMenuItem,
} from '@/components/UI';
import { useLocation, useReward } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import {
  ProductCard,
  RewardsListHeader,
  RewardCreatDialog,
} from '@/modules/Rewards';
import { useRouter } from 'next/router';

const Rewards = () => {
  const router = useRouter();
  const { locations, onGetLocations } = useLocation();
  const { products, onGetProductsByLocationId } = useReward();
  const [searchValue, setSearchValue] = useState('');
  const [isOpenCreateDlg, setIsOpenCreatDlg] = useState<boolean>(false);
  const [selectedLocationId, setSelectedLocationId] = useState<number>(0);

  useEffect(() => {
    onGetLocations({ filterBy: { search: '' } });
  }, [router]);

  useEffect(() => {
    setSelectedLocationId(locations[0].id);
  }, [locations]);

  useEffect(() => {
    if (selectedLocationId > 0) {
      onGetProductsByLocationId(selectedLocationId);
    }
  }, [selectedLocationId]);

  const handleClick = (id: number) => {
    setSelectedLocationId(id);
  };

  return (
    <DashboardLayout title="Rewards">
      <RewardsListHeader
        searchValue={searchValue}
        onValueChange={(value: string) => setSearchValue(value)}
        onOpenDlg={() => setIsOpenCreatDlg(true)}
      />
      <Divider sx={{ mt: '30px' }} />
      <Box display="flex" sx={{ mt: 4 }}>
        <UIFlexWrapBox
          sx={{
            gap: '20px',
            width: '20%',
            flexDirection: 'column',
          }}
        >
          {locations.map((location) =>
            location.id === selectedLocationId ? (
              <UISelectMenuItem
                key={`location-option-${location.id}`}
                value={location.id}
                sx={{ width: '100%', fontSize: '16px' }}
                onClick={() => handleClick(location.id)}
              >
                {location.name}
              </UISelectMenuItem>
            ) : (
              <UIOptionMenuItem
                key={`location-option-${location.id}`}
                value={location.id}
                sx={{ width: '100%', fontSize: '16px' }}
                onClick={() => handleClick(location.id)}
              >
                {location.name}
              </UIOptionMenuItem>
            )
          )}
        </UIFlexWrapBox>
        <UIFlexWrapBox sx={{ gap: '20px', width: '80%' }}>
          {products.map((product) => (
            <ProductCard
              key={`product-item-${product.id}`}
              locationId={selectedLocationId}
              product={product}
            />
          ))}
        </UIFlexWrapBox>
      </Box>
      <RewardCreatDialog
        isOpenCreateDlg={isOpenCreateDlg}
        closeDlg={() => {
          setIsOpenCreatDlg(false);
        }}
      />
    </DashboardLayout>
  );
};

export default Rewards;
