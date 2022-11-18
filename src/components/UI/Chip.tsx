import { Chip, styled } from '@mui/material';

export const UIChip = styled(Chip)({
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '400',
  height: '22px',
  minWidth: '55px',
  textTransform: 'capitalize',
  '&.MuiChip-colorSuccess': {
    backgroundColor: '#B2E7E5',
    '& .MuiChip-label': {
      color: '#03543F',
    },
  },
  '&.MuiChip-colorError': {
    backgroundColor: '#ECB4B4',
    '& .MuiChip-label': {
      color: '#250606',
    },
  },
  '&.MuiChip-colorInfo': {
    backgroundColor: '#D8E5DF',
    '& .MuiChip-label': {
      color: '#767B7B',
    },
  },
  '&.MuiChip-colorDefault': {
    backgroundColor: '#A2D1FC',
    '& .MuiChip-label': {
      color: '#03543F',
    },
  },
});
