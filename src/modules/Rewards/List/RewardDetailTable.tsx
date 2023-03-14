import React from 'react';
import { Table, TableHead, TableBody } from '@mui/material';
import { Product } from '@/types';
import { UIChip, UIListTableCell, UIListTableRow } from '@/components/UI';
import { getColor } from '@/libs/data-helper';

interface IRewardDetailTable {
  rewards: Product.Data[];
}

const RewardDetailTable = ({ rewards }: IRewardDetailTable) => {
  return (
    <Table size="small">
      <TableHead>
        <UIListTableRow>
          <UIListTableCell>ID</UIListTableCell>
          <UIListTableCell>Name</UIListTableCell>
          <UIListTableCell>Detail</UIListTableCell>
          <UIListTableCell>Point</UIListTableCell>
          <UIListTableCell>Status</UIListTableCell>
          <UIListTableCell>Due Date</UIListTableCell>
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {rewards.map((reward, index) => {
          return (
            <UIListTableRow key={`reward-${reward.id}`}>
              <UIListTableCell>{index + 1}</UIListTableCell>
              <UIListTableCell>{reward.name}</UIListTableCell>
              <UIListTableCell sx={{ color: 'rgba(0, 0, 0, 0.3) !important' }}>
                {reward.short}
              </UIListTableCell>
              <UIListTableCell>{reward.point}</UIListTableCell>
              <UIListTableCell align="center">
                <UIChip label={reward.status} color={getColor(reward.status)} />
              </UIListTableCell>
              <UIListTableCell>{reward.createdAt}</UIListTableCell>
            </UIListTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default RewardDetailTable;
