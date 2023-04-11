import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  TableHead,
  TableBody,
  TableRow,
  Typography,
  // IconButton,
} from '@mui/material';
// import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import {
  UICardBox,
  UIChip,
  UITable,
  UITableRow,
  UITableCell,
} from '@/components/UI';
import { getColor } from '@/libs/data-helper';
import RewardsPagination from './Pagination';
import { useReward } from '@/hooks';
import { Reward } from '@/types';

const LocationDetailRewardTable = () => {
  const router = useRouter();
  const { id: locationId } = router.query;
  const { rewards, onFilterRewards, pageInfo } = useReward();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        await getRewardsByLocationId({
          filterBy: { locationId: Number(locationId), search: '' },
          cursor: { page, size: rowsPerPage },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRewards();
  }, [locationId, router]);

  const getRewardsByLocationId = async (filter: Reward.Filter) => {
    await onFilterRewards(filter);
  };
  const rewardsByLocation = rewards?.[0]?.reward ?? [];
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
            {/* <UITableCell></UITableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rewardsByLocation.length > 0 ? (
            rewardsByLocation.map((item: Reward.Data) => {
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
                      ? format(
                          new Date(item.product.createdAt),
                          'yyyy-MM-dd hh:mm'
                        )
                      : ''}
                  </UITableCell>
                  {/* <UITableCell>
                    <IconButton
                      data-key={item.id}
                      // onClick={(event: React.MouseEvent<HTMLElement>) => {
                      //   setAnchorElOptionsMenu(event.currentTarget);
                      // }}
                    >
                      <MoreHorizIcon
                        sx={{ color: 'rgba(137, 200, 198, 0.5)' }}
                      />
                    </IconButton>
                  </UITableCell> */}
                </UITableRow>
              );
            })
          ) : (
            <UITableRow
              sx={{
                position: 'relative',
                backgroundColor: 'transparent !important',
              }}
            >
              <UITableCell colSpan={6} sx={{ textAlign: 'center' }}>
                No Data
              </UITableCell>
            </UITableRow>
          )}
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
