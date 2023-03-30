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
  Typography,
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
import { MenuAction } from '@/constants';
import { formatPhoneNumber, getColor } from '@/libs/data-helper';
import { UserType } from '@/types';
import { useUser } from '@/hooks';

type UsersTableProps = {
  usersTableData: UserType.User[];
};

const UsersTable = ({ usersTableData }: UsersTableProps) => {
  const router = useRouter();
  const { onDeleteUser } = useUser();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const handleNavBtnClick = (key: string) => {
    if (key === MenuAction.DELETE) {
      //TODO Delete Action
      onDeleteUser(
        parseInt(anchorElOptionsMenu?.getAttribute('data-key') ?? '0')
      );
    } else
      router.push(
        `${router.asPath}${
          key === MenuAction.EDIT ? '/edit' : ''
        }/${anchorElOptionsMenu?.getAttribute('data-key')}`
      );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = usersTableData.map((n) => n.id.toString());
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
  const [orderBy, setOrderBy] = useState<keyof UserType.User>('id');

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

  function getComparator<Key extends keyof UserType.User>(
    order: Order,
    orderBy: Key
  ): (a: UserType.User, b: UserType.User) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(
    a: UserType.User,
    b: UserType.User,
    orderBy: keyof UserType.User
  ) {
    if (orderBy === 'firstName') {
      if (`${b.firstName} ${b.lastName}` < `${a.firstName} ${a.lastName}`) {
        return -1;
      }
      if (`${b.firstName} ${b.lastName}` > `${a.firstName} ${a.lastName}`) {
        return 1;
      }
    }
    if ((b[orderBy] ?? '') < (a[orderBy] ?? '')) {
      return -1;
    }
    if ((b[orderBy] ?? '') > (a[orderBy] ?? '')) {
      return 1;
    }

    return 0;
  }

  const createSortHandler =
    (property: keyof UserType.User) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserType.User
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderFirstLogin = (info: any) => {
    if (!info || info?.status !== 200) return;
    return (
      <>
        <Typography variant="caption" component="p">
          IP: {info.ip}
        </Typography>
        <Typography variant="caption" component="p">
          {`${info.city} ${info.region_code}, ${info.postal}, ${info.country_code}`}
        </Typography>
      </>
    );
  };

  return (
    <Table>
      <TableHead>
        <UIListTableRow>
          <UIListTableCell>
            <Checkbox
              indeterminate={
                selected.length > 0 && selected.length < usersTableData.length
              }
              checked={
                usersTableData.length > 0 &&
                selected.length === usersTableData.length
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
              active={orderBy === 'firstName'}
              direction={order}
              onClick={createSortHandler('firstName')}
            >
              Name
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'email'}
              direction={order}
              onClick={createSortHandler('email')}
            >
              Email
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'phone'}
              direction={order}
              onClick={createSortHandler('phone')}
            >
              Phone
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'birthday'}
              direction={order}
              onClick={createSortHandler('birthday')}
            >
              First Login
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell align="center">Role</UIListTableCell>
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
        {usersTableData.length > 0 &&
          stableSort<UserType.User>(
            usersTableData,
            getComparator(order, orderBy)
          ).map((userItem) => {
            const isItemSelected = isSelected(userItem.id.toString());

            return (
              <UIListTableRow
                key={userItem.id}
                data-key={userItem.id}
                role="checkbox"
              >
                <UIListTableCell>
                  <Checkbox
                    checked={isItemSelected}
                    onClick={(event) =>
                      handleClick(event, userItem.id.toString())
                    }
                  />
                </UIListTableCell>
                <UIListTableCell
                  onClick={() => router.push(`${router.asPath}/${userItem.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  #{userItem.id}
                </UIListTableCell>
                <UIListTableCell>{`${userItem?.firstName ?? ''} ${
                  userItem?.lastName ?? ''
                }`}</UIListTableCell>
                <UIListTableCell>{userItem.email}</UIListTableCell>
                <UIListTableCell>
                  {formatPhoneNumber(userItem.phone)}
                </UIListTableCell>
                <UIListTableCell>
                  {renderFirstLogin(userItem?.firstLogin)}
                </UIListTableCell>
                <UIListTableCell align="center">
                  {userItem.role?.name}
                </UIListTableCell>
                <UIListTableCell align="center">
                  <UIChip
                    label={userItem.status}
                    color={getColor(userItem.status ?? 'ACTIVATED')}
                  />
                </UIListTableCell>
                <UIListTableCell>
                  {format(new Date(userItem.createdAt as string), 'yyyy-MM-dd')}
                </UIListTableCell>
                <UIListTableCell>
                  <IconButton
                    data-key={userItem.id}
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

export default UsersTable;
