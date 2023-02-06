import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
  UIListHeader,
} from '@/components/UI';
import { StyledSelectMenuItem } from './ui';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLocation } from '@/hooks';
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
  const { locations } = useLocation();
  const [locationsData, setLocationData] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    setLocationData(
      locations.map((x) => {
        return { id: `${x.id}`, name: x.name };
      })
    );
  }, [locations]);

  return (
    <UIListHeader title="Rewards">
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
          + Create
        </UIDefaultButton>
      </UIFlexWrapBox>
    </UIListHeader>
  );
};

export default RewardsListHeader;
