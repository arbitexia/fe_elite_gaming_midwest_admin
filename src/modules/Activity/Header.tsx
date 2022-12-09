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
import { ActivityModel } from '@/constants/Enum';

interface ActivityListHeaderProps {
  searchValue: string;
  searchType: number;
  onValueChange: (value: string) => void;
  onTypeChange: (value: number) => void;
}

const ActivityListHeader = ({
  searchValue,
  searchType,
  onValueChange,
  onTypeChange,
}: ActivityListHeaderProps) => {
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
        Activity List
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
            {Object.keys(ActivityModel).map((option) => (
              <StyledSelectMenuItem key={option} value={option}>
                {option}
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

export default ActivityListHeader;
