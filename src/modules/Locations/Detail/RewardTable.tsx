import { useRouter } from 'next/router';
import {
  TableHead,
  TableBody,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { UIChip, UIFlexWrapBox } from '@/components/UI';
import {
  StyledLocationCardBox,
  StyledLocationTable,
  StyledLocationTableRow,
  StyledLocationTableCell,
} from './ui';
import { getColor } from '@/libs/data-helper';
import { rewardsData } from '@/_mock/rewards';
import RewardsPagination from './Pagination';

const LocationDetailRewardTable = () => {
  const router = useRouter();
  const getSpecTableCell = (specifications: any) => {
    return Object.keys(specifications).map((key, index) => {
      return (
        <UIFlexWrapBox key={index}>
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.3)',
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {key}:
          </Typography>
          <Typography sx={{ color: '#06251F', fontSize: 14, fontWeight: 500 }}>
            {specifications[key]}
          </Typography>
        </UIFlexWrapBox>
      );
    });
  };
  return (
    <StyledLocationCardBox sx={{ marginTop: '30px' }}>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '17px',
          color: '#222B35',
        }}
      >
        Rewards
      </Typography>
      <StyledLocationTable size="small">
        <TableHead>
          <TableRow>
            <StyledLocationTableCell>ID</StyledLocationTableCell>
            <StyledLocationTableCell>Product</StyledLocationTableCell>
            <StyledLocationTableCell>Detail</StyledLocationTableCell>
            <StyledLocationTableCell>Points</StyledLocationTableCell>
            <StyledLocationTableCell>Status</StyledLocationTableCell>
            <StyledLocationTableCell>Due Date</StyledLocationTableCell>
            <StyledLocationTableCell></StyledLocationTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rewardsData.map((item) => {
            return (
              <StyledLocationTableRow key={item.id}>
                <StyledLocationTableCell
                  onClick={() => router.push(`locations/${item.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  #{item.id}
                </StyledLocationTableCell>
                <StyledLocationTableCell>{item.name}</StyledLocationTableCell>
                <StyledLocationTableCell>
                  {getSpecTableCell(item.specifications)}
                </StyledLocationTableCell>
                <StyledLocationTableCell>{item.point}</StyledLocationTableCell>
                <StyledLocationTableCell>
                  <UIChip label={item.status} color={getColor(item.status)} />
                </StyledLocationTableCell>
                <StyledLocationTableCell sx={{ color: '#B3B3B3 !important' }}>
                  {item.createdAt}
                </StyledLocationTableCell>
                <StyledLocationTableCell>
                  <IconButton
                    data-key={item.id}
                    // onClick={(event: React.MouseEvent<HTMLElement>) => {
                    //   setAnchorElOptionsMenu(event.currentTarget);
                    // }}
                  >
                    <MoreHorizIcon sx={{ color: 'rgba(137, 200, 198, 0.5)' }} />
                  </IconButton>
                </StyledLocationTableCell>
              </StyledLocationTableRow>
            );
          })}
        </TableBody>
      </StyledLocationTable>
      <RewardsPagination />
    </StyledLocationCardBox>
  );
};

export default LocationDetailRewardTable;
