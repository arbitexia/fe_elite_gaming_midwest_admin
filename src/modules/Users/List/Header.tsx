import { useRouter } from 'next/router';
import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { userStatus } from '@/constants/user';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
  UISelectMenuItem,
  UIActionButton,
} from '@/components/UI';
import { Send as SendIcon } from '@mui/icons-material';
import { useAuth, useLocation } from '@/hooks';
import { UserRoleIDEnum } from '@/constants';

interface UsersListHeaderProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchStatus: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
  searchLocation: string;
  setSearchLocation: React.Dispatch<React.SetStateAction<string>>;
  onOpenSendEmail: () => void;
}

const UsersListHeader = ({
  searchValue,
  setSearchValue,
  searchStatus,
  setSearchStatus,
  searchLocation,
  setSearchLocation,
  onOpenSendEmail,
}: UsersListHeaderProps) => {
  const { locations } = useLocation();
  const { me } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  let title = slug as string;
  if (title === 'admins') title = 'Administrators';

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
        {me?.roleId === UserRoleIDEnum.SUPER && (
          <UIFlexCenterBox>
            <Typography
              sx={{ fontWeight: 500, fontSize: 14, color: '#374E4E' }}
            >
              Locations
            </Typography>
            <UIDefaultTextField
              size="small"
              select
              value={searchLocation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchLocation(e.target.value);
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
              {locations?.map((option) => (
                <UISelectMenuItem
                  key={`location${option.id}`}
                  value={option.id}
                >
                  {option.name}
                </UISelectMenuItem>
              ))}
            </UIDefaultTextField>
          </UIFlexCenterBox>
        )}

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(137, 200, 198, 0.4)' }} />
              </InputAdornment>
            ),
          }}
        />
        <UIActionButton
          icon={<SendIcon />}
          color="#28B446 "
          title="Send Email"
          handleClick={onOpenSendEmail}
          sx={{ marginLeft: 0 }}
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
