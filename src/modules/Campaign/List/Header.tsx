import { useRouter } from 'next/router';
import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIDefaultButton,
} from '@/components/UI';

interface CampaignHeaderProps {
  searchValue: string;
  onValueChange: (value: string) => void;
}

export const CampaignHeader = ({
  searchValue,
  onValueChange,
}: CampaignHeaderProps) => {
  const router = useRouter();
  const handleCreate = () => {
    router.push('/campaigns/create');
  };
  return (
    <UIFlexSpaceBox>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '36px',
          lineHeight: '54px',
          alignItems: 'center',
          color: '#89C8C6',
        }}
      >
        Campaigns
      </Typography>
      <UIFlexWrapBox sx={{ gap: '40px' }}>
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
