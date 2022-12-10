import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
} from '@/components/UI';
import { userStatus } from '@/_mock/users';
import { StyledSelectMenuItem } from './ui';
import { useRouter } from 'next/router';

interface UsersListHeaderProps {
  searchValue: string;
  searchStatus: number;
  onValueChange: (value: string) => void;
  onStatusChange: (value: number) => void;
}

const UsersListHeader = ({
  searchValue,
  searchStatus,
  onValueChange,
  onStatusChange,
}: UsersListHeaderProps) => {
  const router = useRouter();
  const { slug } = router.query;
  const title = slug as string;

  const handleCreate = () => {
    router.push(`${router.asPath}/create`);
  };

  return (
    <UIFlexSpaceBox sx={{ mt: '35px' }}>
      <Typography
        sx={{
          ml: '30px',
          fontWeight: 600,
          fontSize: 36,
          lineHeight: '54px',
          color: '#89C8C6',
        }}
      >
        All {title.charAt(0).toUpperCase() + title.slice(1)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onStatusChange(parseInt(e.target.value))
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
            {userStatus.map((option) => (
              <StyledSelectMenuItem key={option.id} value={option.id}>
                {option.value}
              </StyledSelectMenuItem>
            ))}
          </UIDefaultTextField>
        </UIFlexCenterBox>
        <UIDefaultTextField
          placeholder="Search"
          size="small"
          sx={{ width: '160px', input: { color: '#b7b7b7' } }}
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
          + Create
        </UIDefaultButton>
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default UsersListHeader;
