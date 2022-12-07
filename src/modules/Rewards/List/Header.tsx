import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
} from '@/components/UI';
import { StyledSelectMenuItem } from './ui';
import { useRouter } from 'next/router';
import { locationsData } from '@/_mock/locations';

interface RewardsListHeaderProps {
  searchValue: string;
  searchLocation: number;
  onValueChange: (value: string) => void;
  onLocationChange: (value: number) => void;
}

const RewardsListHeader = ({
  searchValue,
  searchLocation,
  onValueChange,
  onLocationChange,
}: RewardsListHeaderProps) => {
  const router = useRouter();
  const handleCreate = () => {
    router.push(`${router.asPath}/create`);
  };

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
        Rewards List
      </Typography>
      <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
        <UIFlexCenterBox>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#374E4E' }}>
            Location
          </Typography>
          <UIDefaultTextField
            size="small"
            select
            value={searchLocation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onLocationChange(parseInt(e.target.value))
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
            <StyledSelectMenuItem value={0}>All</StyledSelectMenuItem>
            {locationsData.map((option) => (
              <StyledSelectMenuItem key={option.id} value={option.id}>
                {option.name}
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

export default RewardsListHeader;
