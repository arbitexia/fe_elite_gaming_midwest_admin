import {
  styled,
  Box,
  Button,
  Typography,
  Table,
  TableRow,
  TableCell,
  tableCellClasses,
} from '@mui/material';

export const StyledLocationCardBox = styled(Box)({
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

export const StyledLocationInfoTitle = styled(Typography)({
  width: '75px',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#06251F',
});

export const StyledLocationInfoValue = styled(Typography)({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#06251F',
});

export const StyledLocationTable = styled(Table)({
  marginTop: '25px',
  borderCollapse: 'separate',
  borderSpacing: '0 10px',
});

export const StyledLocationTableRow = styled(TableRow)({
  boxShadow: '0px 7px 20px rgba(25, 42, 89, 0.05)',
});

export const StyledLocationTableCell = styled(TableCell)({
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

export const StyledLocationEditPhotoButton = styled(Button)({
  width: '190px',
  height: '42px',
  background: 'rgba(191, 215, 225, 0.05)',
  border: '2px solid rgba(137, 200, 198, 0.4)',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#008A83',
});

export const StyledLocationAddPhotoButton = styled(Button)({
  width: '190px',
  height: '42px',
  background: 'rgba(60, 96, 95, 0.8)',
  border: '1px solid rgba(191, 215, 225, 0.05)',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#FFFFFF',
});
