import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { UIFlexSpaceBox, UIOptionMenuItem } from '@/components/UI';
import { useLocation, useProduct, useReward } from '@/hooks';
import { CreateRewardParam } from '@/types';

const RewardCreatDialog = ({
  isOpenCreateDlg,
  closeDlg,
}: {
  isOpenCreateDlg: boolean;
  closeDlg: () => void;
}) => {
  const { locations } = useLocation();
  const { products } = useProduct();
  const { onCreateReward } = useReward();
  const [locationId, setLocationId] = useState<string>('');
  const [productId, setProductId] = React.useState<string[]>([]);

  const handleLocationChange = (
    event: SelectChangeEvent<typeof locationId>
  ) => {
    const value = event.target.value;
    setLocationId(value);
  };

  const handleProductChange = (event: SelectChangeEvent<typeof productId>) => {
    const value = event.target.value;
    setProductId(typeof value === 'string' ? value.split(',') : value);
  };

  const handleOk = async () => {
    const params: CreateRewardParam = {
      input: {
        locationId: parseInt(locationId),
        productIds: productId.toString(),
      },
    };
    await onCreateReward(params);
    closeDlg();
  };

  return (
    <Dialog open={isOpenCreateDlg}>
      <DialogTitle>Create New Reward</DialogTitle>
      <DialogContent>
        <UIFlexSpaceBox>
          <Select
            sx={{ width: 200, height: 32 }}
            value={locationId}
            onChange={handleLocationChange}
          >
            {locations.map((location) => (
              <UIOptionMenuItem
                key={`location-option-${location.id}`}
                value={location.id}
                sx={{ width: '100%', height: 32 }}
              >
                {location.name}
              </UIOptionMenuItem>
            ))}
          </Select>
          <Select
            sx={{ width: 200, height: 32 }}
            multiple
            value={productId}
            onChange={handleProductChange}
          >
            {products.map((product) => (
              <UIOptionMenuItem
                key={`product-option-${product.id}`}
                value={product.id}
                sx={{ width: '100%', height: 32 }}
              >
                {product.name}
              </UIOptionMenuItem>
            ))}
          </Select>
        </UIFlexSpaceBox>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeDlg}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RewardCreatDialog;
