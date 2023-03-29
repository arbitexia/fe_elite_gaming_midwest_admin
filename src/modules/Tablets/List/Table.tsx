import { useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  Table,
  TableHead,
  TableBody,
  Checkbox,
  IconButton,
  Divider,
  TableSortLabel,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { menuTabletActions } from '@/_mock/users';
import {
  UIChip,
  UIOptionMenuItemText,
  UIOptionMenu,
  UIOptionMenuItem,
  UIListTableCell,
  UIListTableRow,
} from '@/components/UI';
import { MenuAction } from '@/constants';
import { getColor } from '@/libs/data-helper';
import { TabletType } from '@/types';
import { useTablet } from '@/hooks';
import ConfirmModal from '@/components/App/Modal/ConfirmModal';

type TabletsTableProps = {
  tabletsTableData: TabletType.Data[];
  onAction: (value: TabletType.Data, type: 'edit' | 'change_password') => void;
  onSort: (value: string) => void;
};

type Order = 'asc' | 'desc';

const TabletsTable = ({
  tabletsTableData,
  onAction,
  onSort,
}: TabletsTableProps) => {
  const router = useRouter();
  const { onDeleteTablet } = useTablet();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TabletType.Data>('id');
  const [deleteId, setDeleteId] = useState<number>();

  const handleClickMenuAction = (key: string) => {
    const selectedId = parseInt(
      anchorElOptionsMenu?.getAttribute('data-key') ?? '0'
    );
    const selectedItem = tabletsTableData.find((t) => t.id === selectedId);
    if (key === MenuAction.EDIT) {
      selectedItem && onAction(selectedItem, 'edit');
    } else if (key === MenuAction.DELETE) {
      setDeleteId(selectedId);
    } else {
      selectedItem && onAction(selectedItem, 'change_password');
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tabletsTableData.map((n) => n.id.toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const createSortHandler =
    (property: keyof TabletType.Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TabletType.Data
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
            <Checkbox
              indeterminate={
                selected.length > 0 && selected.length < tabletsTableData.length
              }
              checked={
                tabletsTableData.length > 0 &&
                selected.length === tabletsTableData.length
              }
              onChange={handleSelectAllClick}
            />
          </UIListTableCell>
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
              active={orderBy === 'location'}
              direction={order}
              onClick={createSortHandler('location')}
            >
              Location
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
          <UIListTableCell />
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {tabletsTableData?.map((tabletItem) => {
          const isItemSelected = isSelected(tabletItem.id.toString());

          return (
            <UIListTableRow
              key={tabletItem.id}
              data-key={tabletItem.id}
              role="checkbox"
            >
              <UIListTableCell>
                <Checkbox
                  checked={isItemSelected}
                  onClick={(event) =>
                    handleClick(event, tabletItem.id.toString())
                  }
                />
              </UIListTableCell>
              <UIListTableCell
                onClick={() => router.push(`${router.asPath}/${tabletItem.id}`)}
                sx={{ cursor: 'pointer' }}
              >
                #{tabletItem.id}
              </UIListTableCell>
              <UIListTableCell>{tabletItem.name}</UIListTableCell>
              <UIListTableCell align="center">
                <UIChip
                  label={tabletItem.status}
                  color={getColor(tabletItem.status ?? 'ACTIVATED')}
                />
              </UIListTableCell>
              <UIListTableCell>{tabletItem?.location?.name}</UIListTableCell>
              <UIListTableCell>
                {format(new Date(tabletItem.createdAt as string), 'yyyy-MM-dd')}
              </UIListTableCell>
              <UIListTableCell>
                <IconButton
                  data-key={tabletItem.id}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    setAnchorElOptionsMenu(event.currentTarget);
                  }}
                >
                  <MoreHorizIcon sx={{ color: '#83A9A8' }} />
                </IconButton>
              </UIListTableCell>
            </UIListTableRow>
          );
        })}
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
        {menuTabletActions.map((item, index) => {
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
      <ConfirmModal
        open={!!deleteId}
        onClose={() => {
          setDeleteId(undefined);
        }}
        title="Delete"
        content="Are you sure you want to remove this tablet?"
        onAction={() => {
          onDeleteTablet(deleteId ?? 0);
          setDeleteId(undefined);
        }}
      />
    </Table>
  );
};

export default TabletsTable;
