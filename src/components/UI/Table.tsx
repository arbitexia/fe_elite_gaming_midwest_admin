import {
  styled,
  Table,
  TableRow,
  TableCell,
  tableCellClasses,
  tableRowClasses,
} from '@mui/material';

export const UITable = styled(Table)({
  marginTop: '25px',
  borderCollapse: 'separate',
  borderSpacing: '0 10px',
});

export const UITableRow = styled(TableRow)({
  boxShadow: '0px 7px 20px rgba(25, 42, 89, 0.05)',
});

export const UITableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '21px',
    letterSpacing: '0.1px',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: '80px',
    fontWeight: 500,
    color: '#222B35',
    background: '#FFFFFF',
    border: '1px solid #F3F3F3',
    borderRight: 0,
    borderLeft: 0,
    '&:first-of-type': {
      borderRadius: '7px 0 0 7px',
      color: '#718096',
      fontWeight: 400,
    },
    '&:last-of-type': {
      borderRadius: '0 7px 7px 0',
      color: '',
    },
  },
});

export const UIListTableHeaderCell = styled(TableCell)({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '21px',
  letterSpacing: '0.1px',
  textTransform: 'uppercase',
  color: 'rgba(0, 0, 0, 0.3)',
});

export const UIListTableCell = styled(TableCell)({
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

export const UIListTableRow = styled(TableRow)({
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
