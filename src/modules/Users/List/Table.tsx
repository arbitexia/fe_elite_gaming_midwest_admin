import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Table,
  TableHead,
  TableBody,
  Checkbox,
  IconButton,
  Divider,
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
import { menuActions, userRole, userStatus } from '@/_mock/users';
import { getColor } from '@/libs/data-helper';
import { MenuAction } from '@/constants/Enum';
import { UserType } from '@/types';

type UsersTableProps = {
  usersTableData: UserType[];
};

const UsersTable = ({ usersTableData }: UsersTableProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const handleNavBtnClick = (key: string) => {
    console.log(anchorElOptionsMenu?.getAttribute('data-key'));
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
          <StyledTableCell>Id</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>Phone</StyledTableCell>
          <StyledTableCell>Birthday</StyledTableCell>
          <StyledTableCell align="center">Role</StyledTableCell>
          <StyledTableCell align="center">Status</StyledTableCell>
          <StyledTableCell>Created At</StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {usersTableData.map((userItem) => {
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
              <StyledTableCell>{`${userItem.firstName} ${userItem.lastName}`}</StyledTableCell>
              <StyledTableCell>{userItem.email}</StyledTableCell>
              <StyledTableCell>{userItem.phonenumber}</StyledTableCell>
              <StyledTableCell>{userItem.birthday}</StyledTableCell>
              <StyledTableCell align="center">
                {userRole[userItem.role - 1].value}
              </StyledTableCell>
              <StyledTableCell align="center">
                <UIChip
                  label={userStatus[userItem.status].value}
                  color={getColor(userStatus[userItem.status].value)}
                />
              </StyledTableCell>
              <StyledTableCell>{userItem.createdAt}</StyledTableCell>
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
