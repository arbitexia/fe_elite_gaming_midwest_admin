import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
} from '@/components/UI';
import { Typography, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const RequestsHeader = () => {
  const router = useRouter();
  const handleCreate = () => {
    // router.push('/locations/create');
  };
  return (
    <>
      <UIFlexSpaceBox sx={{ mt: '35px' }}>
        <UIFlexWrapBox sx={{ alignItems: 'center', gap: '12px' }}>
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '36px',
              lineHeight: '54px',
              alignItems: 'center',
              color: '#89C8C6',
            }}
          >
            Requests
          </Typography>
        </UIFlexWrapBox>
        <UIFlexWrapBox sx={{ gap: '40px' }}>
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
        </UIFlexWrapBox>
      </UIFlexSpaceBox>
    </>
  );
};
