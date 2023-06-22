import { useRouter } from 'next/router';
import { InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexWrapBox,
  UIDefaultTextField,
  UIDefaultButton,
  UIListHeader,
} from '@/components/UI';
import { useAuth } from '@/hooks';
import { UserRoleIDEnum } from '@/constants';

interface IProductsListHeader {
  searchValue: string;
  onValueChange: (value: string) => void;
}

const ProductsListHeader = ({
  searchValue,
  onValueChange,
}: IProductsListHeader) => {
  const router = useRouter();
  const { me } = useAuth();
  const handleCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <UIListHeader title="Inventory">
      <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
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
        {me?.roleId === UserRoleIDEnum.SUPER && (
          <>
            <Divider orientation="vertical" sx={{ height: '40px' }} />
            <UIDefaultButton
              sx={{ minWidth: '110px', borderRadius: '8px' }}
              onClick={handleCreate}
            >
              Add new product
            </UIDefaultButton>
          </>
        )}
      </UIFlexWrapBox>
    </UIListHeader>
  );
};

export default ProductsListHeader;
