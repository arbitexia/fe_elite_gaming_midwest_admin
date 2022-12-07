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
  Typography,
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { UIChip, UIFlexWrapBox } from '@/components/UI';
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

  const getSpecTableCell = (specifications: any) => {
    return Object.keys(specifications).map((key, index) => {
      return (
        <UIFlexWrapBox key={index}>
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.3)',
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {key}:
          </Typography>
          <Typography sx={{ color: '#06251F', fontSize: 14, fontWeight: 500 }}>
            {specifications[key]}
          </Typography>
        </UIFlexWrapBox>
      );
    });
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
          <StyledTableCell>Id</StyledTableCell>
          <StyledTableCell>Product</StyledTableCell>
          <StyledTableCell>Detail</StyledTableCell>
          <StyledTableCell>Points</StyledTableCell>
          <StyledTableCell align="center">Status</StyledTableCell>
          <StyledTableCell align="center">Due Date</StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {rewardsTableData.map((rewardItem) => {
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
                <Typography
                  sx={{
                    cursor: 'pointer',
                    div: { display: 'none' },
                    ':hover>div': { display: 'block' },
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
                    }}
                  >
                    <Box
                      component="img"
                      src={rewardItem.urls[0]}
                      alt="Image"
                      width={300}
                      height={300}
                    />
                  </Box>
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                {getSpecTableCell(rewardItem.specifications)}
              </StyledTableCell>
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
