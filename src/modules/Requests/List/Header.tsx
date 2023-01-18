import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
} from '@/components/UI';
import { Typography, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface RequestsHeaderProps {
  searchValue: string;
  onValueChange: (value: string) => void;
}

export const RequestsHeader = ({
  searchValue,
  onValueChange,
}: RequestsHeaderProps) => {
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
        Requests
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
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};
