import React, { useState } from 'react';
import { format } from 'date-fns';
import { Table, TableHead, TableBody, Box, IconButton } from '@mui/material';
import { Reward } from '@/types';
import {
  UIChip,
  UIListTableCell,
  UIListTableRow,
  UIOptionMenuItemText,
  UIOptionMenu,
  UIOptionMenuItem,
} from '@/components/UI';
import { getColor } from '@/libs/data-helper';
import { menuRewardActions } from '@/_mock/users';
import { MenuAction } from '@/constants';
import ConfirmModal from '@/components/App/Modal/ConfirmModal';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';

type RewardDetailTableProps = {
  rewards: Reward.Data[];
  onDelete: (rewardId: number) => void;
};

const RewardDetailTable = ({ rewards, onDelete }: RewardDetailTableProps) => {
  const [deleteId, setDeleteId] = useState<number>();
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const handleNavBtnClick = (key: string) => {
    const selectedId = parseInt(
      anchorElOptionsMenu?.getAttribute('data-key') ?? '0'
    );
    if (key === MenuAction.DELETE) {
      setDeleteId(selectedId);
    }
  };

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
          <UIListTableCell />
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
                    ? format(new Date(reward.createdAt), 'yyyy-MM-dd yy:mm')
                    : ''}
                </UIListTableCell>
                <UIListTableCell>
                  <IconButton
                    data-key={reward.id}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      setAnchorElOptionsMenu(event.currentTarget);
                    }}
                  >
                    <MoreHorizIcon sx={{ color: '#83A9A8' }} />
                  </IconButton>
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

      <UIOptionMenu
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorEl={anchorElOptionsMenu}
        open={isOptionsMenuOpen}
        onClose={() => {
          setAnchorElOptionsMenu(null);
        }}
        onClick={() => {
          setAnchorElOptionsMenu(null);
        }}
      >
        {menuRewardActions.map((item, index) => {
          return (
            <div key={index}>
              <UIOptionMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => handleNavBtnClick(item.action)}
              >
                <UIOptionMenuItemText key={index} sx={{ color: item.color }}>
                  {item.label}
                </UIOptionMenuItemText>
              </UIOptionMenuItem>
            </div>
          );
        })}
      </UIOptionMenu>
      <ConfirmModal
        open={!!deleteId}
        onClose={() => {
          setDeleteId(undefined);
        }}
        title="Delete"
        content="Are you sure you want to remove this reward?"
        onAction={() => {
          onDelete(deleteId ?? 0);
          setDeleteId(undefined);
        }}
      />
    </Table>
  );
};

export default RewardDetailTable;
