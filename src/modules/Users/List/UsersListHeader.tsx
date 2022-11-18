import { useState } from 'react';
import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIAuthButton,
} from '@/components/UI';
import { userStatusData } from '@/_mock/users';
import { StyledSelectMenuItem } from '../ui';

const UsersListHeader = () => {
  const [searchStatus, setSearchStatus] = useState(1);

  return (
    <UIFlexSpaceBox>
      <Typography
        sx={{
          ml: '30px',
          fontWeight: 600,
          fontSize: 36,
          lineHeight: '54px',
          color: '#89C8C6',
        }}
      >
        Users List
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
              setSearchStatus(parseInt(e.target.value))
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
            {userStatusData.map((option) => (
              <StyledSelectMenuItem key={option.id} value={option.id}>
                {option.label}
              </StyledSelectMenuItem>
            ))}
          </UIDefaultTextField>
        </UIFlexCenterBox>
        <UIDefaultTextField
          placeholder="Search"
          size="small"
          sx={{ width: '160px', input: { color: '#b7b7b7' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(137, 200, 198, 0.4)' }} />
              </InputAdornment>
            ),
          }}
        />
        <Divider orientation="vertical" sx={{ height: '40px' }} />
        <UIAuthButton sx={{ minWidth: '110px', borderRadius: '8px' }}>
          Create +
        </UIAuthButton>
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default UsersListHeader;
