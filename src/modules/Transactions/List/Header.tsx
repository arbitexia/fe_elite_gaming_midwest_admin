import { Typography, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { transactionsType } from '@/constants/transaction';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
} from '@/components/UI';
import { StyledSelectMenuItem } from './ui';

interface TransactionsListHeaderProps {
  searchValue: string;
  searchType: number;
  onValueChange: (value: string) => void;
  onTypeChange: (value: number) => void;
}

const TransactionsListHeader = ({
  searchValue,
  searchType,
  onValueChange,
  onTypeChange,
}: TransactionsListHeaderProps) => {
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
        Transactions
      </Typography>
      <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
        <UIFlexCenterBox>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: '#374E4E' }}>
            Type
          </Typography>
          <UIDefaultTextField
            size="small"
            select
            value={searchType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onTypeChange(parseInt(e.target.value))
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
            {transactionsType.map((option) => (
              <StyledSelectMenuItem key={option.id} value={option.id}>
                {option.value}
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
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default TransactionsListHeader;
