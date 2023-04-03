import React from 'react';
import { format } from 'date-fns';
import { Table, TableHead, TableBody, Box } from '@mui/material';
import { Reward } from '@/types';
import { UIChip, UIListTableCell, UIListTableRow } from '@/components/UI';
import { getColor } from '@/libs/data-helper';

interface IRewardDetailTable {
  rewards: Reward.Data[];
}

const RewardDetailTable = ({ rewards }: IRewardDetailTable) => {
  return (
    <Table>
      <TableHead>
        <UIListTableRow>
          <UIListTableCell></UIListTableCell>
          <UIListTableCell>Name</UIListTableCell>
          <UIListTableCell>Detail</UIListTableCell>
          <UIListTableCell>Point</UIListTableCell>
          <UIListTableCell>Status</UIListTableCell>
          <UIListTableCell>Due Date</UIListTableCell>
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {rewards && rewards.length > 0 ? (
          rewards?.map((reward, index) => {
            const { product } = reward;
            return (
              <UIListTableRow key={`reward-${index}`}>
                <UIListTableCell>
                  <Box
                    component="img"
                    src={
                      product?.gallery && product?.gallery.length > 0
                        ? product.gallery[0].asset?.url ?? '/images/noImage.jpg'
                        : '/images/noImage.jpg'
                    }
                    width={60}
                    height={60}
                    sx={{ borderRadius: '6px', objectFit: 'cover' }}
                  />
                </UIListTableCell>
                <UIListTableCell>{product.name}</UIListTableCell>
                <UIListTableCell
                  sx={{ color: 'rgba(0, 0, 0, 0.3) !important' }}
                >
                  {product.short}
                </UIListTableCell>
                <UIListTableCell>{product.point}</UIListTableCell>
                <UIListTableCell>
                  <UIChip
                    label={product.status}
                    color={getColor(product.status)}
                  />
                </UIListTableCell>
                <UIListTableCell>
                  {reward.createdAt
                    ? format(new Date(reward.createdAt), 'yyyy-MM-dd')
                    : ''}
                </UIListTableCell>
              </UIListTableRow>
            );
          })
        ) : (
          <UIListTableRow
            sx={{
              position: 'relative',
              backgroundColor: 'transparent !important',
            }}
          >
            <UIListTableCell colSpan={6} sx={{ textAlign: 'center' }}>
              No Data
            </UIListTableCell>
          </UIListTableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RewardDetailTable;
