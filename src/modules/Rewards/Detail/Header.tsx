import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIDefaultButton,
  UIActionButton,
  UIFlexWrapBox,
} from '@/components/UI';

export type ProductDetailHeaderProps = {
  name: string;
  isEditable: boolean;
};

const ProductDetailHeader = ({
  name,
  isEditable,
}: ProductDetailHeaderProps) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <UIFlexSpaceBox
      sx={{ mt: '35px', mb: '30px', alignItems: 'center', gap: '12px' }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '17px',
          color: '#06251F',
        }}
      >
        {name}
      </Typography>
      <UIFlexWrapBox>
        {isEditable ? (
          <UIDefaultButton type="submit">Save</UIDefaultButton>
        ) : (
          <>
            <UIActionButton
              icon={<Edit />}
              color="#28B446"
              title="Edit"
              handleClick={() => {
                router.push(`/products/edit/${id}`);
              }}
            />
          </>
        )}
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default ProductDetailHeader;
