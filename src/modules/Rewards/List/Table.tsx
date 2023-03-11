import { useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  Checkbox,
  IconButton,
  Divider,
  TableSortLabel,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { menuActions } from '@/_mock/users';
import {
  UIChip,
  UIListTableRow,
  UIListTableCell,
  UIOptionMenu,
  UIOptionMenuItem,
  UIOptionMenuItemText,
} from '@/components/UI';
import { MenuAction } from '@/constants';
import { getColor } from '@/libs/data-helper';
import { Product } from '@/types';

type RewardsTableProps = {
  rewardsTableData: Product[];
};

const RewardsTable = ({ rewardsTableData }: RewardsTableProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const handleNavBtnClick = (key: string) => {
    if (key === MenuAction.DELETE) {
      //TODO Delete Action
    } else
      router.push(
        `${router.asPath}${
          key === MenuAction.EDIT ? '/edit' : ''
        }/${anchorElOptionsMenu?.getAttribute('data-key')}`
      );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rewardsTableData.map((n) => n.id.toString());
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

  type Order = 'asc' | 'desc';
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Product>('id');

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(
    a: Product,
    b: Product,
    orderBy: keyof Product
  ) {
    console.log(a, b, orderBy);
    // if (b[orderBy] < a[orderBy]) {
    //   return -1;
    // }
    // if (b[orderBy] > a[orderBy]) {
    //   return 1;
    // }
    return 0;
  }

  function getComparator<Key extends keyof Product>(
    order: Order,
    orderBy: Key
  ): (a: Product, b: Product) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Table>
      <TableHead>
        <UIListTableRow>
          <UIListTableCell>
            <Checkbox
              indeterminate={
                selected.length > 0 && selected.length < rewardsTableData.length
              }
              checked={
                rewardsTableData.length > 0 &&
                selected.length === rewardsTableData.length
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
              Product
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>Detail</UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'point'}
              direction={order}
              onClick={createSortHandler('point')}
            >
              Points
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
          <UIListTableCell align="center">
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Due Date
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell />
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {stableSort<Product>(
          rewardsTableData,
          getComparator(order, orderBy)
        ).map((rewardItem) => {
          const isItemSelected = isSelected(rewardItem.id.toString());
          // const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <UIListTableRow
              key={rewardItem.id}
              data-key={rewardItem.id}
              role="checkbox"
              sx={{ position: 'relative' }}
            >
              <UIListTableCell>
                <Checkbox
                  checked={isItemSelected}
                  onClick={(event) =>
                    handleClick(event, rewardItem.id.toString())
                  }
                />
              </UIListTableCell>
              <UIListTableCell
                onClick={() => router.push(`${router.asPath}/${rewardItem.id}`)}
                sx={{ cursor: 'pointer' }}
              >
                #{rewardItem.id}
              </UIListTableCell>
              <UIListTableCell>
                <Box
                  sx={{
                    cursor: 'pointer',
                    div: { display: 'none' },
                    ':hover>div': { display: 'flex' },
                    position: 'relative',
                  }}
                >
                  {rewardItem.name}
                  <Box
                    sx={{
                      position: 'absolute',
                      zIndex: 1,
                      left: 150,
                      top: -150,
                      border: '2px solid rgba(137, 200, 198, 0.25)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      filter: 'drop-shadow(0px 4px 50px rgba(0, 0, 0, 0.25))',
                      backdropFilter: 'blur(10px)',
                      padding: '2px',
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        rewardItem.gallery && rewardItem.gallery.length
                          ? rewardItem.gallery[0].asset?.url ??
                            '/images/noImage.jpg'
                          : '/images/noImage.jpg'
                      }
                      alt="Image"
                      width={300}
                      height={300}
                      sx={{
                        borderRadius: '10px',
                      }}
                    />
                  </Box>
                </Box>
              </UIListTableCell>
              <UIListTableCell>{rewardItem.short}</UIListTableCell>
              <UIListTableCell>{rewardItem.point}</UIListTableCell>
              <UIListTableCell align="center">
                <UIChip
                  label={rewardItem.status}
                  color={getColor(rewardItem.status)}
                />
              </UIListTableCell>
              <UIListTableCell align="center">
                {rewardItem.createdAt
                  ? format(new Date(rewardItem.createdAt), 'yyyy-MM-dd')
                  : ''}
              </UIListTableCell>
              <UIListTableCell>
                <IconButton
                  data-key={rewardItem.id}
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
        {menuActions.map((item, index) => {
          return (
            <div key={index}>
              {index === 2 && <Divider />}
              <UIOptionMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => handleNavBtnClick(item.action)}
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
    </Table>
  );
};

export default RewardsTable;
