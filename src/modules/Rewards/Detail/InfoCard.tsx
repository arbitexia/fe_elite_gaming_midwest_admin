import { Typography, Stack } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIInfoTitle,
  UIInfoValue,
} from '@/components/UI';
import { Location, Product } from '@/types';

const ProductsDetailInfoCard = ({
  productItem,
  location,
}: {
  productItem: Product.Data;
  location?: Location.Data | null;
}) => {
  return (
    <UICardBox>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Information:
      </Typography>
      <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Points:</UIInfoTitle>
            <UIInfoValue>{productItem.name}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Location:</UIInfoTitle>
            <UIInfoValue>{location?.name}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Description:</UIInfoTitle>
            <UIInfoValue>{productItem.description}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Status:</UIInfoTitle>
            <UIInfoValue>{productItem.status}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Type:</UIInfoTitle>
            <UIInfoValue>{productItem.short}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
    </UICardBox>
  );
};

export default ProductsDetailInfoCard;
