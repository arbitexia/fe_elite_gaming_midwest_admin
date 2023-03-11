import { Typography, Stack } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIInfoTitle,
  UIInfoValue,
} from '@/components/UI';
import { Product } from '@/types';

const ProductsDetailInfoCard = ({ productItem }: { productItem: Product }) => {
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
            <UIInfoTitle>Description:</UIInfoTitle>
            <UIInfoValue>{productItem.description}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Amount:</UIInfoTitle>
            <UIInfoValue>{productItem.amount}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
    </UICardBox>
  );
};

export default ProductsDetailInfoCard;
