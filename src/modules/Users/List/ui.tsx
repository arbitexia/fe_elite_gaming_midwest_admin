import {
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
  tableRowClasses,
} from '@mui/material';

export const StyledSelectMenuItem = styled(MenuItem)({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '21px',
  textAlign: 'center',
  color: 'rgba(137, 200, 198, 0.8)',
});

export const StyledTableHeaderCell = styled(TableCell)({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '21px',
  letterSpacing: '0.1px',
  textTransform: 'uppercase',
  color: 'rgba(0, 0, 0, 0.3)',
});

export const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '21px',
    letterSpacing: '0.1px',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
    '.MuiCheckbox-root': {
      color: 'rgba(0, 0, 0, 0.3)',

      '&.Mui-checked': {
        color: '#89C8C6',
      },
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: '80px',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.3)',
    '&:nth-of-type(3)': {
      color: '#06251F',
      fontWeight: 600,
    },
    '&:nth-of-type(4)': {
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize: 13,
    },
    '&:nth-of-type(5)': {
      color: 'rgba(0, 0, 0, 0.7)',
      fontWeight: 500,
    },
    '&:nth-of-type(6)': {
      color: 'rgba(0, 0, 0, 0.5)',
      fontWeight: 500,
    },
    '.MuiCheckbox-root': {
      color: 'rgba(0, 0, 0, 0.2)',

      '&.Mui-checked': {
        color: '#89C8C6',
      },
    },
  },
  border: 0,
});

export const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    background: 'rgba(194, 239, 238, 0.2)',
  },
  '&:nth-of-type(even)': {
    background: 'rgba(242, 255, 253, 0.5)',
  },
  [`&.${tableRowClasses.head}`]: {
    background: 'transparent',
  },

  border: 0,
});

export const StyledOptionMenu = styled(Menu)({
  '&.MuiMenu-paper': {
    background: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid rgba(137, 200, 198, 0.15)',
    boxShadow: '10px 10px 25px rgba(25, 42, 89, 0.15)',
    overflow: 'visible',
  },
});

export const StyledOptionMenuItem = styled(MenuItem)({
  width: '170px',
  padding: '10px 20px',
});

export const StyledOptionMenuItemText = styled(Typography)({
  fontSize: 14,
  fontWeight: 600,
});
