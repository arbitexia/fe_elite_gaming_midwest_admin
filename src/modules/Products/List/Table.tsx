import { useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  Typography,
} from '@mui/material';
import {
  MoreHoriz as MoreHorizIcon,
  Add as PlusIcon,
  Remove as MinusIcon,
} from '@mui/icons-material';
import { menuActions } from '@/_mock/users';
import {
  UIChip,
  UIListTableRow,
  UIListTableCell,
  UIOptionMenu,
  UIOptionMenuItem,
  UIOptionMenuItemText,
  UIEditTextField,
} from '@/components/UI';
import { MenuAction } from '@/constants';
import { useProduct } from '@/hooks';
import { getColor } from '@/libs/data-helper';
import { useAppToast } from '@/providers';
import { Product } from '@/types';

type ProductsTableProps = {
  productsTableData: Product.Data[];
  onOrder: (value: string) => void;
  onUpdateAmount: (data: Product.Data) => void;
};

const ProductsTable = ({
  productsTableData,
  onOrder,
  onUpdateAmount,
}: ProductsTableProps) => {
  const router = useRouter();
  const appToast = useAppToast();
  const { onDeleteProduct } = useProduct();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [anchorElOptionsMenu, setAnchorElOptionsMenu] =
    useState<null | HTMLElement>(null);
  const [anchorId, setAnchorId] = useState(0);
  const [name, setName] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const isOptionsMenuOpen = Boolean(anchorElOptionsMenu);

  const handleNavBtnClick = (key: string) => {
    if (key === MenuAction.DELETE) {
      setOpenDeleteModal(true);
    } else
      router.push(
        `${router.asPath}${
          key === MenuAction.EDIT ? '/edit' : ''
        }/${anchorElOptionsMenu?.getAttribute('data-key')}`
      );
  };

  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleOk = () => {
    onDeleteProduct({ id: anchorId });
    setOpenDeleteModal(false);
    appToast({
      severity: 'success',
      message: `The ${name} has been removed!`,
    });
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = productsTableData.map((n) => n.id.toString());
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
  const [orderBy, setOrderBy] = useState<keyof Product.Data>('id');

  const createSortHandler =
    (property: keyof Product.Data) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Product.Data
  ) => {
    const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    onOrder(`${property}|${newOrder}`);
  };

  const handleChangeAmount = (
    action: 'Increase' | 'Decrease',
    product: Product.Data
  ) => {
    onUpdateAmount(
      action === 'Increase'
        ? { ...product, amount: product.amount + 1 }
        : { ...product, amount: product.amount - 1 }
    );
  };

  return (
    <Table>
      <TableHead>
        <UIListTableRow>
          <UIListTableCell>
            <Checkbox
              indeterminate={
                selected.length > 0 &&
                selected.length < productsTableData.length
              }
              checked={
                productsTableData &&
                productsTableData.length > 0 &&
                selected.length === productsTableData.length
              }
              onChange={handleSelectAllClick}
            />
          </UIListTableCell>
          <UIListTableCell></UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'name'}
              direction={order}
              onClick={createSortHandler('name')}
            >
              Product
            </TableSortLabel>
          </UIListTableCell>
          <UIListTableCell>
            <TableSortLabel
              active={orderBy === 'short'}
              direction={order}
              onClick={createSortHandler('short')}
            >
              Detail
            </TableSortLabel>
          </UIListTableCell>
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
              active={orderBy === 'amount'}
              direction={order}
              onClick={createSortHandler('amount')}
            >
              Amount
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
        {productsTableData.length === 0 && (
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
        {productsTableData?.map((productItem, index) => {
          const isItemSelected = isSelected(productItem.id.toString());
          return (
            <UIListTableRow
              key={index}
              data-key={productItem.id}
              role="checkbox"
              sx={{ position: 'relative' }}
            >
              <UIListTableCell>
                <Checkbox
                  checked={isItemSelected}
                  onClick={(event) => {
                    handleClick(event, productItem.id.toString());
                  }}
                />
              </UIListTableCell>
              <UIListTableCell
                onClick={() =>
                  router.push(`${router.asPath}/${productItem.id}`)
                }
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                    div: { display: 'none' },
                    ':hover>div': { display: 'flex' },
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      zIndex: 1,
                      left: 100,
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
                        productItem.gallery && productItem.gallery.length
                          ? productItem.gallery[0].asset?.url ??
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
                  <Box
                    component="img"
                    src={
                      productItem?.gallery && productItem?.gallery.length > 0
                        ? productItem.gallery[0].asset?.url ??
                          '/images/noImage.jpg'
                        : '/images/noImage.jpg'
                    }
                    width={60}
                    height={60}
                    sx={{ borderRadius: '6px', objectFit: 'cover' }}
                  />
                </Box>
              </UIListTableCell>
              <UIListTableCell>{productItem.name}</UIListTableCell>
              <UIListTableCell>{productItem.short}</UIListTableCell>
              <UIListTableCell>{productItem.point}</UIListTableCell>
              <UIListTableCell align="center">
                <UIChip
                  label={productItem.status}
                  color={getColor(productItem.status)}
                />
              </UIListTableCell>
              <UIListTableCell align="center" sx={{ color: '#000!important' }}>
                <IconButton
                  onClick={() => {
                    handleChangeAmount('Decrease', productItem);
                  }}
                >
                  <MinusIcon />
                </IconButton>
                <UIEditTextField
                  type="number"
                  name="product.amount"
                  value={productItem.amount}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  sx={{ width: '80px' }}
                  disabled
                />
                <IconButton
                  onClick={() => {
                    handleChangeAmount('Increase', productItem);
                  }}
                >
                  <PlusIcon />
                </IconButton>
              </UIListTableCell>
              <UIListTableCell align="center">
                {productItem.createdAt
                  ? format(new Date(productItem.createdAt), 'yyyy-MM-dd')
                  : ''}
              </UIListTableCell>
              <UIListTableCell>
                <IconButton
                  data-key={productItem.id}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    setAnchorId(productItem.id);
                    setName(productItem.name);
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
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={openDeleteModal}
      >
        <DialogTitle>Delete {name}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove {name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Table>
  );
};

export default ProductsTable;
