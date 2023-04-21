import { useRouter } from 'next/router';
import { Typography, InputAdornment, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIDefaultButton,
} from '@/components/UI';

interface EmailTemplateHeaderProps {
  onSearch: (value: string) => void;
  searchValue: string;
}

const EmailTemplateHeader = ({
  onSearch,
  searchValue,
}: EmailTemplateHeaderProps) => {
  const router = useRouter();

  const handleCreate = () => {
    router.push(`${router.asPath}/create`);
  };

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
        Email Template
      </Typography>
      <UIFlexWrapBox sx={{ gap: '40px', alignItems: 'center' }}>
        <UIDefaultTextField
          placeholder="Search"
          size="small"
          sx={{
            input: { color: '#b7b7b7' },
            '.MuiOutlinedInput-root': { width: '160px' },
            '.Mui-focused': { width: '250px' },
          }}
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onSearch(e.target.value);
          }}
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

export default EmailTemplateHeader;
