import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useLocation, useProduct, useReward } from '@/hooks';
import { UIDefaultTextField, UIFlexWrapBox } from '@/components/UI';
import { Reward } from '@/types';

const RewardCreateDialog = ({
  isOpenCreateDlg,
  closeDlg,
}: {
  isOpenCreateDlg: boolean;
  closeDlg: () => void;
}) => {
  const { locations, onGetLocations } = useLocation();
  const { products, onGetProducts } = useProduct();
  const { onCreateRewards } = useReward();
  const [searchLocationValue, setSearchLocationValue] = useState('');
  const [searchProductVal, setSearchProductVal] = useState('');
  const [locationId, setLocationId] = useState(0);
  const [productIds, setProductIds] = useState<number[]>([]);

  useEffect(() => {
    handleLocationSearch();
  }, [searchLocationValue]);

  useEffect(() => {
    handleProductSearch();
  }, [searchProductVal]);

  const handleLocationSearch = () => {
    onGetLocations({ filterBy: { search: searchLocationValue } });
  };

  const handleProductSearch = () => {
    onGetProducts({
      filterBy: {
        product: 0,
        search: searchProductVal,
        pointFrom: 0,
        pointTo: 100000000,
      },
      cursor: { page: 0, size: 1000 },
    });
  };

  const handleCheckLocation = (value: number) => {
    setLocationId(value);
  };

  const handleToggleProduct = (value: number) => () => {
    const currentIndex = productIds.indexOf(value);
    const newChecked = [...productIds];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setProductIds(newChecked);
  };

  const handleOk = async () => {
    if (productIds.length > 0) {
      const body: Reward.Body = {
        input: productIds.map((productId) => ({ locationId, productId })),
      };
      onCreateRewards(body);
    }
    closeDlg();
  };

  return (
    <Dialog open={isOpenCreateDlg}>
      <DialogTitle>Create New Reward</DialogTitle>
      <DialogContent>
        <UIFlexWrapBox sx={{ justifyContent: 'center', flexWrap: 'nowrap' }}>
          <Paper>
            <UIDefaultTextField
              placeholder="Search Location"
              size="small"
              sx={{
                width: '100%',
                input: { color: '#b7b7b7' },
              }}
              value={searchLocationValue}
              onChange={(e) => setSearchLocationValue(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(137, 200, 198, 0.4)' }} />
                  </InputAdornment>
                ),
              }}
            />
            <List
              dense
              sx={{
                width: '200px',
                height: '300px',
                bgcolor: 'background.paper',
              }}
            >
              {locations.map((location) => {
                const labelId = `location-checkbox-list-secondary-label-${location.name}-${location.id}`;
                return (
                  <ListItem
                    key={labelId}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={() => handleCheckLocation(location.id)}
                        checked={location.id === locationId}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={labelId} primary={location.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <Paper>
            <UIDefaultTextField
              placeholder="Search Products"
              size="small"
              sx={{
                width: '100%',
                input: { color: '#b7b7b7' },
              }}
              value={searchProductVal}
              onChange={(e) => setSearchProductVal(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(137, 200, 198, 0.4)' }} />
                  </InputAdornment>
                ),
              }}
            />
            <List
              dense
              sx={{
                width: '200px',
                height: '300px',
                bgcolor: 'background.paper',
              }}
            >
              {products.map((product) => {
                const labelId = `product-checkbox-list-secondary-label-${product.name}-${product.id}`;
                return (
                  <ListItem
                    key={labelId}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggleProduct(product.id)}
                        checked={productIds.indexOf(product.id) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={labelId} primary={product.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </UIFlexWrapBox>
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

export default RewardCreateDialog;
