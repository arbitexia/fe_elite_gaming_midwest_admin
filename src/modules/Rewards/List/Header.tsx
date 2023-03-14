import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIDefaultButton,
  UIListHeader,
} from '@/components/UI';

interface RewardsListHeaderProps {
  searchValue: string;
  onValueChange: (value: string) => void;
  onOpenDlg: () => void;
}

const RewardsListHeader = ({
  searchValue,
  onValueChange,
  onOpenDlg,
}: RewardsListHeaderProps) => {
  return (
    <UIListHeader title="Rewards">
      <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
        <UIFlexCenterBox>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#374E4E' }}>
            Reward
          </Typography>
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
          onClick={onOpenDlg}
        >
          + Create
        </UIDefaultButton>
      </UIFlexWrapBox>
    </UIListHeader>
  );
};

export default RewardsListHeader;
