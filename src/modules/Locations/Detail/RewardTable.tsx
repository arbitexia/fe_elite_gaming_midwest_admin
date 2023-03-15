import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  TableHead,
  TableBody,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import {
  UICardBox,
  UIChip,
  UITable,
  UITableRow,
  UITableCell,
  UIInfoTitle,
} from '@/components/UI';
import { getColor } from '@/libs/data-helper';
import RewardsPagination from './Pagination';
import { useReward } from '@/hooks';
import { Reward } from '@/types';

const LocationDetailRewardTable = () => {
  const router = useRouter();
  const { id: locationId } = router.query;
  const { rewards, onFilterRewards, pageInfo } = useReward();
  const [rewardsItem, setRewardsItem] = useState<Reward.Data[]>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        await getRewardsByLocationId({
          filterBy: { locationId: Number(locationId), search: '' },
          cursor: { page: 0, size: 1000 },
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (locationId && !rewards) {
      fetchRewards();
    } else {
      setRewardsItem(rewards?.[0]?.reward);
    }
  }, [locationId, router, rewards]);

  const getRewardsByLocationId = async (filter: Reward.Filter) => {
    await onFilterRewards(filter);
  };

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
          {rewardsItem?.map((item) => {
            return (
              <UITableRow key={item.id}>
                <UITableCell
                  onClick={() => router.push(`locations/${item.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  #{item.id}
                </UITableCell>
                <UITableCell>{item.product.name}</UITableCell>
                <UITableCell>{item.product.short}</UITableCell>
                <UITableCell>{item.product.point}</UITableCell>
                <UITableCell>
                  <UIChip
                    label={item.product.status}
                    color={getColor(item.product.status)}
                  />
                </UITableCell>
                <UITableCell sx={{ color: '#B3B3B3 !important' }}>
                  {item.product.createdAt
                    ? format(new Date(item.product.createdAt), 'yyyy-MM-dd')
                    : ''}
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
      <RewardsPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </UICardBox>
  );
};

export default LocationDetailRewardTable;
