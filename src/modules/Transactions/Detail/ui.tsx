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
  marginTop: '30px',
  boxShadow: '0px 15px 30px -23px #192A5933',
  padding: '20px 25px',
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

export const StyledDetailBoxFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: theme.spacing(2.5, 0, 1),
}));

export const StyledQuestionCol = styled(Box)({
  '> p': {
    '&:nth-of-type(1)': {
      color: '#222B35',
      fontSize: '14px',
      letterSpacing: '0.1px',
      fontWeight: 700,
    },

    '&:nth-of-type(2)': {
      color: '#667180',
      fontSize: '14px',
      letterSpacing: '0.1px',
    },
  },
});

export const StyledTable = styled(Table)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

export const TableHeadCell = styled(TableCell)({
  color: '#667180',
  fontSize: '14px',
  letterSpacing: '0.1px',
  fontWeight: 700,
});

export const StyledDescription = styled(TableCell)({
  '&.MuiTableCell-root': {
    borderBottom: 'none',
  },

  '> p': {
    padding: 0,

    '&:nth-of-type(1)': {
      color: '#222B35',
      fontSize: '14px',
      letterSpacing: '0.25px',
      fontWeight: 700,
      marginBottom: '5px',
    },

    '&:nth-of-type(2)': {
      color: '#667180',
      fontSize: '14px',
      letterSpacing: '0.1px',
      width: '70%',
    },
  },
});

export const StyledTableRow = styled(TableRow)({
  'td, th': {
    border: 'none',
  },
});
