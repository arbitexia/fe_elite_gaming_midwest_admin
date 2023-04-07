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
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useLocation, useProduct, useReward } from '@/hooks';
import { UIDefaultTextField, UIFlexWrapBox } from '@/components/UI';
import { Reward } from '@/types';
import { LocationStatus } from '@/constants/enum';
import { useAppToast } from '@/providers';

const RewardCreateDialog = ({
  isOpenCreateDlg,
  closeDlg,
}: {
  isOpenCreateDlg: boolean;
  closeDlg: () => void;
}) => {
  const appToast = useAppToast();
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
    appToast({
      severity: 'success',
      message: 'New reward item has been added!',
    });

    closeDlg();
    resetValues();
  };
  const resetValues = () => {
    setLocationId(0);
    setProductIds([]);
    setSearchProductVal('');
    setSearchLocationValue('');
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
                height: '300px',
                overflow: 'auto',
                bgcolor: 'background.paper',
              }}
            >
              {locations
                ?.filter((obj) => obj.status === LocationStatus.OPEN)
                ?.map((location) => {
                  const labelId = `location-checkbox-list-secondary-label-${location.name}-${location.id}`;
                  return (
                    <ListItem
                      key={labelId}
                      onClick={() => handleCheckLocation(location.id)}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={location.id === locationId}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
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
                height: '300px',
                overflow: 'auto',
                bgcolor: 'background.paper',
              }}
            >
              {products.map((product) => {
                const labelId = `product-checkbox-list-secondary-label-${product.name}-${product.id}`;
                return (
                  <ListItem
                    key={labelId}
                    onClick={handleToggleProduct(product.id)}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={productIds.indexOf(product.id) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
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
        <Button
          autoFocus
          onClick={() => {
            closeDlg();
            resetValues();
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RewardCreateDialog;
