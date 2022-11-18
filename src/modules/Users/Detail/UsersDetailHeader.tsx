import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIAuthButton,
} from '@/components/UI';
import { userStatusData, usersTableData } from '@/_mock/users';
import { StyledSelectMenuItem } from '../ui';
import { UserType } from '@/types';

const UsersListHeader = () => {
  const router = useRouter();
  const [searchStatus, setSearchStatus] = useState(1);
  const [userData, setUserData] = useState<UserType | null>(null);
  const { id } = router.query;

  useEffect(() => {
    usersTableData.forEach((item) => {
      if (item.id === parseInt(id as string)) setUserData(item);
    });
  }, [userData, id]);

  return (
    <Box>
      {userData && (
        <>
          <Typography
            sx={{
              ml: '30px',
              fontWeight: 600,
              fontSize: 24,
              lineHeight: '17px',
              color: '#06251F',
            }}
          >
            {userData.name}`s Information
          </Typography>
          <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
            <UIFlexCenterBox>
              <Typography
                sx={{ fontWeight: 500, fontSize: 14, color: '#374E4E' }}
              >
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
        </>
      )}
    </Box>
  );
};

export default UsersListHeader;
