import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIImage,
  UIDefaultTextField,
  UIAuthButton,
} from '@/components/UI';
import { Typography, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const LocationsHeader = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push('/locations/create');
  };
  return (
    <>
      <UIFlexSpaceBox sx={{ mt: '35px' }}>
        <UIFlexWrapBox sx={{ alignItems: 'center', gap: '12px' }}>
          <UIImage src="images/icons/pin.svg" width={25} height={25} />
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '36px',
              lineHeight: '54px',
              alignItems: 'center',
              color: '#89C8C6',
            }}
          >
            Locations
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
          <UIAuthButton
            sx={{ minWidth: '110px', borderRadius: '8px' }}
            onClick={handleCreate}
          >
            Create +
          </UIAuthButton>
        </UIFlexWrapBox>
      </UIFlexSpaceBox>
    </>
  );
};
