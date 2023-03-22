import { Typography, InputAdornment, Divider, SvgIcon } from '@mui/material';
import { Download, Search as SearchIcon } from '@mui/icons-material';
import {
  UIFlexSpaceBox,
  UIFlexWrapBox,
  UIDefaultTextField,
  UIFlexCenterBox,
  UIActionButton,
  UIDefaultButton,
} from '@/components/UI';
import { ActivityModel } from '@/constants';
import { StyledSelectMenuItem } from './ui';

interface ActivityListHeaderProps {
  searchValue: string;
  searchType: string;
  onValueChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCSVExport: () => void;
}

const ActivityListHeader = ({
  searchValue,
  searchType,
  onValueChange,
  onTypeChange,
  onCSVExport,
}: ActivityListHeaderProps) => {
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
        Activities
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
              onTypeChange(e.target.value)
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
            <StyledSelectMenuItem value={'ALL'}>All</StyledSelectMenuItem>
            {Object.keys(ActivityModel).map((option) => {
              return (
                <StyledSelectMenuItem key={option} value={option}>
                  {option}
                </StyledSelectMenuItem>
              );
            })}
          </UIDefaultTextField>
        </UIFlexCenterBox>
        <UIFlexCenterBox>
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
          <Divider orientation="vertical" sx={{ height: '40px', mx: 2 }} />
          <UIDefaultButton
            sx={{ minWidth: '110px', borderRadius: '8px' }}
            onClick={onCSVExport}
          >
            <SvgIcon sx={{ width: '17px', height: '17px' }}>
              <Download />
            </SvgIcon>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 700,
                marginLeft: '8px',
                lineHeight: '14px',
              }}
            >
              Export as CSV
            </Typography>
          </UIDefaultButton>
        </UIFlexCenterBox>
      </UIFlexWrapBox>
    </UIFlexSpaceBox>
  );
};

export default ActivityListHeader;
