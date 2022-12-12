import {
  Box,
  Grid,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

export const StyledOrderModalHeading = styled(Typography)({
  color: '#222B35',
  fontWeight: 700,
  fontSize: '24px',
  letterSpacing: '0.1px',
});

export const StyledDetailBox = styled(Box)({
  background: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0px 15px 30px -23px #192A5933',
  padding: '20px 25px',
});

export const StyledTooltipBox = styled(Box)({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '20px',
  cursor: 'pointer',

  '&:last-child': {
    paddingRight: 0,
  },
});

export const StyledDetailHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const StyledDetailBoxHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4, 4, 1),
}));

export const StyledStatusCol = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  '> p': {
    color: '#222B35',
    fontWeight: 700,
    fontSize: '20px',
    letterSpacing: '0.1px',

    marginTop: '10px',
  },
});

export const StyledLabel = styled(Typography)({
  background: '#DEF7EC',
  height: '30px',
  color: '#03543F',
  padding: '5px 10px',
  fontWeight: 400,
  fontSize: '14px',
  borderRadius: '8px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledDetailGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4, 4, 1),
}));

export const StyledGridBox = styled(Box)(({ theme }) => ({
  h5: {
    color: '#212d57',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '0.1px',
    textTransform: 'uppercase',
    marginBottom: '15px',
  },

  p: {
    color: '#222B35',
    fontSize: '14px',
    letterSpacing: '0.1px',
    textTransform: 'capitalize',
    marginBottom: '8px',
  },

  '> div': {
    marginTop: theme.spacing(4),
  },
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

export const TableHeadCell = styled(TableCell)({
  color: '#667180',
  fontSize: '14px',
  letterSpacing: '0.1px',
  fontWeight: 700,
});

export const StyledTableRow = styled(TableRow)({
  'td, th': {
    border: 'none',
  },
});
