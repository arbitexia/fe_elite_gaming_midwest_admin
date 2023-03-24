import { useRouter } from 'next/router';
import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
  UIListHeader,
  UISelectMenuItem,
} from '@/components/UI';
import { useLocation } from '@/hooks';

interface IProductsListHeader {
  searchValue: string;
  searchProduct: number;
  onValueChange: (value: string) => void;
  onProductChange: (value: number) => void;
}

const ProductsListHeader = ({
  searchValue,
  searchProduct,
  onValueChange,
  onProductChange,
}: IProductsListHeader) => {
  const router = useRouter();
  const { locations } = useLocation();
  const handleCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <UIListHeader title="Inventory">
      <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
        <UIFlexCenterBox>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#374E4E' }}>
            Product
          </Typography>
          <UIDefaultTextField
            size="small"
            select
            value={searchProduct}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onProductChange(parseInt(e.target.value))
            }
            sx={{
              width: '160px',
              '.MuiInputBase-input': {
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '21px',
                color: 'rgba(137, 200, 198, 0.8)',
              },
            }}
          >
            <UISelectMenuItem value={0}>All</UISelectMenuItem>
            {locations.map((option) => (
              <UISelectMenuItem key={option.id} value={option.id}>
                {option.name}
              </UISelectMenuItem>
            ))}
          </UIDefaultTextField>
        </UIFlexCenterBox>
        <UIDefaultTextField
          placeholder="Search"
          size="small"
          sx={{
            '.MuiOutlinedInput-root': { width: '160px' },
            '.Mui-focused': { width: '250px' },
            input: { color: '#b7b7b7' },
          }}
          value={searchValue}
          onChange={(e) => onValueChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(137, 200, 198, 0.4)' }} />
              </InputAdornment>
            ),
          }}
        />
        <Divider orientation="vertical" sx={{ height: '40px' }} />
        <UIDefaultButton
          sx={{ minWidth: '110px', borderRadius: '8px' }}
          onClick={handleCreate}
        >
          Add new product
        </UIDefaultButton>
      </UIFlexWrapBox>
    </UIListHeader>
  );
};

export default ProductsListHeader;
