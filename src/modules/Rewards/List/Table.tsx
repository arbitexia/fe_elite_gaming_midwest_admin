import { useState } from 'react';
import { useRouter } from 'next/router';
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
import { UIChip } from '@/components/UI';
import {
  StyledTableRow,
  StyledTableCell,
  StyledOptionMenuItemText,
  StyledOptionMenu,
  StyledOptionMenuItem,
} from './ui';
import { menuActions } from '@/_mock/users';
import { getColor } from '@/libs/data-helper';
import { MenuAction } from '@/constants/Enum';
import { RewardItemType } from '@/types';

type RewardsTableProps = {
  rewardsTableData: RewardItemType[];
};

const RewardsTable = ({ rewardsTableData }: RewardsTableProps) => {
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
  const [orderBy, setOrderBy] = useState<keyof RewardItemType>('id');

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

  function getComparator<Key extends keyof RewardItemType>(
    order: Order,
    orderBy: Key
  ): (a: RewardItemType, b: RewardItemType) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(
    a: RewardItemType,
    b: RewardItemType,
    orderBy: keyof RewardItemType
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const createSortHandler =
    (property: keyof RewardItemType) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RewardItemType
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
                selected.length > 0 && selected.length < rewardsTableData.length
              }
              checked={
                rewardsTableData.length > 0 &&
                selected.length === rewardsTableData.length
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
              active={orderBy === 'name'}
              direction={order}
              onClick={createSortHandler('name')}
            >
              Product
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell>Detail</StyledTableCell>
          <StyledTableCell>
            <TableSortLabel
              active={orderBy === 'point'}
              direction={order}
              onClick={createSortHandler('point')}
            >
              Points
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell align="center">
            <TableSortLabel
              active={orderBy === 'status'}
              direction={order}
              onClick={createSortHandler('status')}
            >
              Status
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell align="center">
            <TableSortLabel
              active={orderBy === 'createdAt'}
              direction={order}
              onClick={createSortHandler('createdAt')}
            >
              Due Date
            </TableSortLabel>
          </StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {stableSort<RewardItemType>(
          rewardsTableData,
          getComparator(order, orderBy)
        ).map((rewardItem) => {
          const isItemSelected = isSelected(rewardItem.id.toString());
          // const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <StyledTableRow
              key={rewardItem.id}
              data-key={rewardItem.id}
              role="checkbox"
              sx={{ position: 'relative' }}
            >
              <StyledTableCell>
                <Checkbox
                  checked={isItemSelected}
                  onClick={(event) =>
                    handleClick(event, rewardItem.id.toString())
                  }
                />
              </StyledTableCell>
              <StyledTableCell
                onClick={() => router.push(`${router.asPath}/${rewardItem.id}`)}
                sx={{ cursor: 'pointer' }}
              >
                #{rewardItem.id}
              </StyledTableCell>
              <StyledTableCell>
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
                      src={rewardItem.urls[0]}
                      alt="Image"
                      width={300}
                      height={300}
                      sx={{
                        borderRadius: '10px',
                      }}
                    />
                  </Box>
                </Box>
              </StyledTableCell>
              <StyledTableCell>{rewardItem.short}</StyledTableCell>
              <StyledTableCell>{rewardItem.point}</StyledTableCell>
              <StyledTableCell align="center">
                <UIChip
                  label={rewardItem.status}
                  color={getColor(rewardItem.status)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                {rewardItem.createdAt}
              </StyledTableCell>
              <StyledTableCell>
                <IconButton
                  data-key={rewardItem.id}
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

export default RewardsTable;
