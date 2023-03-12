import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { UIFlexSpaceBox, UIItemCard } from '@/components/UI';
import { Product } from '@/types';
import {
  StyledLocationViewButton,
  StyledLocationEditButton,
  StyledImageBox,
} from './ui';

export type ProductCardProp = {
  locationId: number;
  product: Product;
};

const ProductCard = ({ locationId, product }: ProductCardProp) => {
  const router = useRouter();

  return (
    <UIItemCard sx={{ width: 300, height: 360 }}>
      <StyledImageBox>
        <Box
          component="img"
          src={
            product.gallery && product.gallery.length > 0
              ? product.gallery[0].asset?.url ?? '/images/noImage.jpg'
              : '/images/noImage.jpg'
          }
          width={220}
          height={160}
        />
      </StyledImageBox>
      <Typography
        sx={{
          mt: '30px',
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '22px',
          minHeight: '22px',
          color: 'gba(5, 34, 33, 0.8)',
        }}
      >
        {product.name}
      </Typography>
      <Typography
        sx={{
          mt: '10px',
          fontWeight: '600',
          fontSize: '12px',
          lineHeight: '22px',
          minHeight: '22px',
          color: 'gba(5, 34, 33, 0.8)',
        }}
      >
        {`${product.amount} / ${product.point}`}
      </Typography>
      <UIFlexSpaceBox sx={{ marginTop: '30px' }}>
        <StyledLocationViewButton
          onClick={() => router.push(`/rewards/${locationId}/${product.id}`)}
        >
          View More
        </StyledLocationViewButton>
        <StyledLocationEditButton
          onClick={() => router.push(`/products/edit/${product.id}`)}
        >
          Edit
        </StyledLocationEditButton>
      </UIFlexSpaceBox>
    </UIItemCard>
  );
};

export default ProductCard;
