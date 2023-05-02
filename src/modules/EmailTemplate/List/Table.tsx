import { useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  Table,
  TableHead,
  TableBody,
  IconButton,
  Divider,
  TableSortLabel,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { menuActions } from '@/_mock/users';
import {
  UIChip,
  UIOptionMenuItemText,
  UIOptionMenu,
  UIOptionMenuItem,
  UIListTableCell,
  UIListTableRow,
} from '@/components/UI';

import { EmailTemplateType } from '@/types';
import { MenuAction } from '@/constants';
import { AppConfirmModal } from '@/components/App';
import { getColor } from '@/libs/data-helper';

type EmailTemplateTableProps = {
  emailTemplateData: EmailTemplateType.Data[];
  onAction: (
    value: EmailTemplateType.Data,
    type: 'Edit' | 'View' | 'Delete'
  ) => void;
  onSort: (value: string) => void;
};

type Order = 'asc' | 'desc';

const EmailTemplateTable = ({
  emailTemplateData,
  onAction,
  onSort,
}: EmailTemplateTableProps) => {
  const router = useRouter();
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof EmailTemplateType.Data>('id');
  const [selectedItem, setSelectedItem] = useState<EmailTemplateType.Data>();

  const handleClickMenuAction = (key: string) => {
    const selectedId = parseInt(
      anchorElOptionsMenu?.getAttribute('data-key') ?? '0'
    );
    const filteredItem = emailTemplateData.find((t) => t.id === selectedId);
    if (key === MenuAction.EDIT) {
      filteredItem && onAction(filteredItem, 'Edit');
    } else if (key === MenuAction.DELETE) {
      setSelectedItem(filteredItem);
    } else {
      filteredItem && onAction(filteredItem, 'View');
    }
  };

  const createSortHandler =
    (property: keyof EmailTemplateType.Data) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof EmailTemplateType.Data
  ) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    onSort(`${property}|${newOrder}`);
  };

  return (
    <Table>
      <TableHead>
        <UIListTableRow>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'id'}
              direction={order}
              onClick={createSortHandler('id')}
            >
              Id
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'name'}
              direction={order}
              onClick={createSortHandler('name')}
            >
              Name
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'templateId'}
              direction={order}
              onClick={createSortHandler('templateId')}
            >
              Template Id
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell align="center">
            <TableSortLabel
              active={orderBy === 'status'}
              direction={order}
              onClick={createSortHandler('status')}
            >
              Status
            </TableSortLabel>
          </UIListTableCell>

          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'category'}
              direction={order}
              onClick={createSortHandler('category')}
            >
              Category
            </TableSortLabel>
          </UIListTableCell>

          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Created At
            </TableSortLabel>
          </UIListTableCell>
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {emailTemplateData?.length > 0 ? (
          emailTemplateData?.map((item) => {
            return (
              <UIListTableRow key={item.id} data-key={item.id} role="checkbox">
                <UIListTableCell
                  onClick={() => router.push(`${router.asPath}/${item.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  #{item.id}
                </UIListTableCell>
                <UIListTableCell>{item.name}</UIListTableCell>
                <UIListTableCell>{item.templateId}</UIListTableCell>
                <UIListTableCell align="center">
                  <UIChip label={item.status} color={getColor(item.status)} />
                </UIListTableCell>
                <UIListTableCell>{item?.category}</UIListTableCell>
                <UIListTableCell>
                  {format(new Date(item.createdAt as string), 'yyyy-MM-dd')}
                </UIListTableCell>
                <UIListTableCell>
                  <IconButton
                    data-key={item.id}
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
            <UIListTableCell colSpan={8} sx={{ textAlign: 'center' }}>
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
        {menuActions.map((item, index) => {
          return (
            <div key={index}>
              {index === 2 && <Divider />}
              <UIOptionMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => handleClickMenuAction(item.action)}
              >
                <UIOptionMenuItemText
                  key={index}
                  sx={{
                    color: item.color,
                    textDecorationLine: index === 0 ? 'underline' : 'none',
                  }}
                >
                  {item.label}
                </UIOptionMenuItemText>
              </UIOptionMenuItem>
            </div>
          );
        })}
      </UIOptionMenu>
      <AppConfirmModal
        open={!!selectedItem}
        onClose={() => {
          setSelectedItem(undefined);
        }}
        title="Delete"
        content="Are you sure you want to remove this template?"
        onAction={() => {
          selectedItem && onAction(selectedItem, 'Delete');
          setSelectedItem(undefined);
        }}
      />
    </Table>
  );
};

export default EmailTemplateTable;
