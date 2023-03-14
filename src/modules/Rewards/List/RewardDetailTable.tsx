import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
} from '@mui/material';
import { Product } from '@/types';
import { UIChip, UIListTableCell, UIListTableRow } from '@/components/UI';
import { getColor } from '@/libs/data-helper';

interface IRewardDetailTable {
  rewards: Product.Data[];
}

const RewardDetailTable = ({ rewards }: IRewardDetailTable) => {
  return (
    <TableContainer component={Paper}>
      <Table>
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
                <UIListTableCell
                  sx={{ color: 'rgba(0, 0, 0, 0.3) !important' }}
                >
                  {reward.short}
                </UIListTableCell>
                <UIListTableCell>{reward.point}</UIListTableCell>
                <UIListTableCell>
                  <UIChip
                    label={reward.status}
                    color={getColor(reward.status)}
                  />
                </UIListTableCell>
                <UIListTableCell>
                  {reward.createdAt
                    ? format(new Date(reward.createdAt), 'yyyy-MM-dd')
                    : ''}
                </UIListTableCell>
              </UIListTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RewardDetailTable;
