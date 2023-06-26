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
  Switch,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import {
  UIOptionMenuItemText,
  UIOptionMenu,
  UIOptionMenuItem,
  UIListTableCell,
  UIListTableRow,
} from '@/components/UI';
import {
  MenuAction,
  campaignNameIcons,
  menuCampaignActions,
} from '@/constants';
import { CampaignType } from '@/types';
import { useTablet } from '@/hooks';
import ConfirmModal from '@/components/App/Modal/ConfirmModal';
import { useAppToast } from '@/providers';

type CampaignTableProps = {
  campaignTableData: CampaignType.Data[];
  onAction: (value: CampaignType.Data, type: 'edit' | 'delete') => void;
};

type Order = 'asc' | 'desc';

const CampaignTable = ({ campaignTableData, onAction }: CampaignTableProps) => {
  const router = useRouter();
  const { onDeleteTablet } = useTablet();
  const appToast = useAppToast();
  const [checked, setChecked] = useState(true);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof CampaignType.Data>('id');
  const [deleteId, setDeleteId] = useState<number>();

  const handleClickMenuAction = (key: string) => {
    const selectedId = parseInt(
      anchorElOptionsMenu?.getAttribute('data-key') ?? '0'
    );
    const selectedItem = campaignTableData.find((t) => t.id === selectedId);
    if (key === MenuAction.EDIT) {
      selectedItem && onAction(selectedItem, 'edit');
    } else if (key === MenuAction.DELETE) {
      setDeleteId(selectedId);
    } else {
      selectedItem && onAction(selectedItem, 'delete');
    }
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
    (property: keyof CampaignType.Data) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CampaignType.Data
  ) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number }
  ) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
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
              active={orderBy === 'type'}
              direction={order}
              onClick={createSortHandler('type')}
            >
              Type
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'offer'}
              direction={order}
              onClick={createSortHandler('offer')}
            >
              Offer
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'total'}
              direction={order}
              onClick={createSortHandler('total')}
            >
              Total
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'redeemed'}
              direction={order}
              onClick={createSortHandler('redeemed')}
            >
              Redeemed
            </TableSortLabel>
          </UIListTableCell>

          <UIListTableCell>%Redeemed</UIListTableCell>
          <UIListTableCell>Enabled</UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'startDate'}
              direction={order}
              onClick={createSortHandler('startDate')}
            >
              Start Date
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'endDate'}
              direction={order}
              onClick={createSortHandler('endDate')}
            >
              End Date
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell />
        </UIListTableRow>
      </TableHead>
      <TableBody>
        {campaignTableData?.length > 0 ? (
          campaignTableData?.map((item) => {
            return (
              <UIListTableRow key={item.id} data-key={item.id} role="checkbox">
                <UIListTableCell>#{item.id}</UIListTableCell>
                <UIListTableCell>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    {
                      campaignNameIcons.find((obj) => obj.name === item.type)
                        ?.icon
                    }
                    {item.name}
                  </Box>
                </UIListTableCell>
                <UIListTableCell>{item.type}</UIListTableCell>
                <UIListTableCell>
                  {item?.offer > 0 && `${item?.offer} Free Game play`}
                </UIListTableCell>
                <UIListTableCell>
                  {item?.total > 0 ? item.total : '-'}
                </UIListTableCell>
                <UIListTableCell>
                  {item?.redeemed > 0 ? item.redeemed : '-'}
                </UIListTableCell>
                <UIListTableCell>
                  <LinearProgressWithLabel value={70} />
                </UIListTableCell>
                <UIListTableCell>
                  <Switch
                    checked={item.status === 0 ? false : true}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </UIListTableCell>
                <UIListTableCell>
                  {/* {format(
                    new Date(item.createdAt as string),
                    'yyyy-MM-dd'
                  )}
                   */}
                  {item.startDate}
                </UIListTableCell>
                <UIListTableCell>
                  {/* {format(
                    new Date(item.createdAt as string),
                    'yyyy-MM-dd'
                  )}
                   */}
                  {item.endDate}
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
            <UIListTableCell colSpan={10} sx={{ textAlign: 'center' }}>
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
        {menuCampaignActions.map((item, index) => {
          return (
            <div key={index}>
              {index === 1 && <Divider />}
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

export default CampaignTable;
