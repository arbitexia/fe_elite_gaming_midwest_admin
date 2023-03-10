import { useRouter } from 'next/router';
import {
  TableHead,
  TableBody,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { rewardsData } from '@/_mock/rewards';
import {
  UICardBox,
  UIChip,
  UITable,
  UITableRow,
  UITableCell,
} from '@/components/UI';
import { getColor } from '@/libs/data-helper';
import RewardsPagination from './Pagination';

const LocationDetailRewardTable = () => {
  const router = useRouter();
  // const getSpecTableCell = (specifications: any) => {
  //   return Object.keys(specifications).map((key, index) => {
  //     return (
  //       <UIFlexWrapBox key={index}>
  //         <Typography
  //           sx={{
  //             color: 'rgba(0, 0, 0, 0.3)',
  //             fontSize: 12,
  //             fontWeight: 500,
  //             textTransform: 'capitalize',
  //           }}
  //         >
  //           {key}:
  //         </Typography>
  //         <Typography sx={{ color: '#06251F', fontSize: 14, fontWeight: 500 }}>
  //           {specifications[key]}
  //         </Typography>
  //       </UIFlexWrapBox>
  //     );
  //   });
  // };
  return (
    <UICardBox sx={{ marginTop: '30px' }}>
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
      <UITable size="small">
        <TableHead>
          <TableRow>
            <UITableCell>ID</UITableCell>
            <UITableCell>Product</UITableCell>
            <UITableCell>Detail</UITableCell>
            <UITableCell>Points</UITableCell>
            <UITableCell>Status</UITableCell>
            <UITableCell>Due Date</UITableCell>
            <UITableCell></UITableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rewardsData.map((item) => {
            return (
              <UITableRow key={item.id}>
                <UITableCell
                  onClick={() => router.push(`locations/${item.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  #{item.id}
                </UITableCell>
                <UITableCell>{item.name}</UITableCell>
                <UITableCell>{item.short}</UITableCell>
                <UITableCell>{item.point}</UITableCell>
                <UITableCell>
                  <UIChip label={item.status} color={getColor(item.status)} />
                </UITableCell>
                <UITableCell sx={{ color: '#B3B3B3 !important' }}>
                  {item.createdAt}
                </UITableCell>
                <UITableCell>
                  <IconButton
                    data-key={item.id}
                    // onClick={(event: React.MouseEvent<HTMLElement>) => {
                    //   setAnchorElOptionsMenu(event.currentTarget);
                    // }}
                  >
                    <MoreHorizIcon sx={{ color: 'rgba(137, 200, 198, 0.5)' }} />
                  </IconButton>
                </UITableCell>
              </UITableRow>
            );
          })}
        </TableBody>
      </UITable>
      <RewardsPagination />
    </UICardBox>
  );
};

export default LocationDetailRewardTable;
