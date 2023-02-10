import { useState } from 'react';
import { useRouter } from 'next/router';
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
import { UIChip } from '@/components/UI';
import {
  StyledTableRow,
  StyledTableCell,
  StyledOptionMenuItemText,
  StyledOptionMenu,
  StyledOptionMenuItem,
} from './ui';
import { menuActions } from '@/_mock/users';
import { formatPhoneNumber, getColor } from '@/libs/data-helper';
import { MenuAction } from '@/constants/Enum';
import { UserType } from '@/types';
import { format } from 'date-fns';
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

  return (
    <Table>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell>
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
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'id'}
              direction={order}
              onClick={createSortHandler('id')}
            >
              Id
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'firstName'}
              direction={order}
              onClick={createSortHandler('firstName')}
            >
              Name
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'email'}
              direction={order}
              onClick={createSortHandler('email')}
            >
              Email
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'phone'}
              direction={order}
              onClick={createSortHandler('phone')}
            >
              Phone
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'birthday'}
              direction={order}
              onClick={createSortHandler('birthday')}
            >
              Birthday
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell align="center">Role</StyledTableCell>
          <StyledTableCell align="center">
            <TableSortLabel
              active={orderBy === 'status'}
              direction={order}
              onClick={createSortHandler('status')}
            >
              Status
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Created At
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {usersTableData.length > 0 &&
          stableSort<UserType.User>(
            usersTableData,
            getComparator(order, orderBy)
          ).map((userItem) => {
            const isItemSelected = isSelected(userItem.id.toString());
            // const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <StyledTableRow
                key={userItem.id}
                data-key={userItem.id}
                role="checkbox"
              >
                <StyledTableCell>
                  <Checkbox
                    checked={isItemSelected}
                    onClick={(event) =>
                      handleClick(event, userItem.id.toString())
                    }
                  />
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => router.push(`${router.asPath}/${userItem.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  #{userItem.id}
                </StyledTableCell>
                <StyledTableCell>{userItem.fullName}</StyledTableCell>
                <StyledTableCell>{userItem.email}</StyledTableCell>
                <StyledTableCell>
                  {userItem.phone ? formatPhoneNumber(userItem.phone) : ''}
                </StyledTableCell>
                <StyledTableCell>
                  {format(new Date(userItem.birthday), 'MM/dd/yyyy')}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {userItem.role?.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <UIChip
                    label={userItem.status}
                    color={getColor(userItem.status ?? 'ACTIVATED')}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  {format(
                    new Date(userItem.createdAt as string),
                    'MM/dd/yyyy hh:mm:ss'
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    data-key={userItem.id}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      setAnchorElOptionsMenu(event.currentTarget);
                    }}
                  >
                    <MoreHorizIcon sx={{ color: '#83A9A8' }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
      </TableBody>
      <StyledOptionMenu
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
              <StyledOptionMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => handleNavBtnClick(item.action)}
              >
                <StyledOptionMenuItemText
                  key={index}
                  sx={{
                    color: item.color,
                    textDecorationLine: index === 0 ? 'underline' : 'none',
                  }}
                >
                  {item.label}
                </StyledOptionMenuItemText>
              </StyledOptionMenuItem>
            </div>
          );
        })}
      </StyledOptionMenu>
    </Table>
  );
};

export default UsersTable;
