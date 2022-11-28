import {
  styled,
  Box,
  Typography,
  Table,
  TableRow,
  TableCell,
  tableCellClasses,
  tableRowClasses,
} from '@mui/material';

export const StyledRequestCardBox = styled(Box)({
  padding: '30px 30px',
  background: '#FFFFFF',
  border: '1px solid #F3F3F3',
  boxShadow: '5px 6px 30px -15px rgba(25, 42, 89, 0.2)',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  minHeight: '450px',
});

export const StyledRequestInfoTitle = styled(Typography)({
  width: '75px',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#06251F',
});

export const StyledRequestInfoValue = styled(Typography)({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#06251F',
});

export const StyledRequestTable = styled(Table)({
  marginTop: '25px',
  borderCollapse: 'separate',
  borderSpacing: '0 10px',
});

export const StyledRequestTableRow = styled(TableRow)({
  '&:nth-of-type(even)': {
    background: '#F7FEFE',
  },
  '&:nth-of-type(odd)': {
    background: '#FDFDFD',
  },
  [`&.${tableRowClasses.head}`]: {
    background: 'transparent',
  },

  border: 0,
});

export const StyledRequestTableCell = styled(TableCell)({
  border: 0,
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '21px',
    letterSpacing: '0.1px',
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: '80px',
    fontWeight: 500,
    color: '#222B35',
  },
});
