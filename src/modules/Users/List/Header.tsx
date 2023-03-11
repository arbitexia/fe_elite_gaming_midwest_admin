import { useRouter } from 'next/router';
import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { userStatus } from '@/_mock/users';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
  UISelectMenuItem,
} from '@/components/UI';

interface UsersListHeaderProps {
  onSearch: () => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchStatus: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
}

const UsersListHeader = ({
  onSearch,
  searchValue,
  setSearchValue,
  searchStatus,
  setSearchStatus,
}: UsersListHeaderProps) => {
  const router = useRouter();
  const { slug } = router.query;
  let title = slug as string;
  if (title === 'admins') title = 'Administrators';

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode == 13) onSearch();
  };

  const handleCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <UIFlexSpaceBox>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 36,
          lineHeight: '54px',
          color: '#89C8C6',
        }}
      >
        {title && `${title.charAt(0).toUpperCase() + title.slice(1)}`}
      </Typography>
      <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
        <UIFlexCenterBox>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#374E4E' }}>
            Status
          </Typography>
          <UIDefaultTextField
            size="small"
            select
            value={searchStatus}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchStatus(e.target.value);
              onSearch();
            }}
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
            <UISelectMenuItem key={'ALL'} value={'ALL'}>
              ALL
            </UISelectMenuItem>
            {userStatus.map((option) => (
              <UISelectMenuItem key={option.id} value={option.id}>
                {option.value}
              </UISelectMenuItem>
            ))}
          </UIDefaultTextField>
        </UIFlexCenterBox>
        <UIDefaultTextField
          placeholder="Search"
          size="small"
          sx={{
            input: { color: '#b7b7b7' },
            '.MuiOutlinedInput-root': { width: '160px' },
            '.Mui-focused': { width: '250px' },
          }}
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={onKeyDown}
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
          + Create
        </UIDefaultButton>
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default UsersListHeader;
