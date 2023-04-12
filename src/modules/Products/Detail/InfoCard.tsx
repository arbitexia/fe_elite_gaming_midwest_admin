import { Typography, Stack, Box } from '@mui/material';
import {
  UICardBox,
  UIFlexWrapBox,
  UIInfoTitle,
  UIInfoValue,
} from '@/components/UI';
import { Product } from '@/types';

interface IProductsDetailInfoCard {
  productItem: Product.Data;
}

const ProductsDetailInfoCard = ({ productItem }: IProductsDetailInfoCard) => {
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
            <UIInfoTitle>Name:</UIInfoTitle>
            <UIInfoValue>{productItem.name}</UIInfoValue>
          </UIFlexWrapBox>
          <UIFlexWrapBox>
            <UIInfoTitle>Amount:</UIInfoTitle>
            <UIInfoValue>{productItem.amount}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
        <Stack direction="column" sx={{ flex: '1 1 0', gap: '18px' }}>
          <UIFlexWrapBox>
            <UIInfoTitle>Short:</UIInfoTitle>
            <UIInfoValue>{productItem.short}</UIInfoValue>
          </UIFlexWrapBox>
        </Stack>
      </UIFlexWrapBox>
      <Box
        sx={{
          width: '100%',
          paddingTop: '20px',
        }}
      >
        <UIInfoTitle>Description:</UIInfoTitle>
        <UIInfoValue sx={{ mt: 1 }}>
          {productItem?.description ?? ''}
        </UIInfoValue>
      </Box>
    </UICardBox>
  );
};

export default ProductsDetailInfoCard;
