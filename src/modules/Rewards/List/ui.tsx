import { styled, Box, Typography } from '@mui/material';
import { UIDefaultTextField } from '@/components/UI';

export const StyledSearchTextField = styled(UIDefaultTextField)({
  width: '250px',
  height: '40px',
  background: 'rgba(137, 200, 198, 0.1)',
  border: '1px solid rgba(137, 200, 198, 0.05)',
  borderRadius: '8px',
  '.MuiOutlinedInput-input': {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    color: '#B7B7B7',
  },
});

export const StyledImageBox = styled(Box)({
  textAlign: 'center',
  padding: 0,
  borderRadius: '6px',
  height: '150px',
  overflow: 'hidden',
});

export const StyledItemBox = styled(Box)({
  '&:nth-of-type(odd)': {
    background: 'rgba(194, 239, 238, 0.2)',
  },
  '&:nth-of-type(even)': {
    background: 'rgba(242, 255, 253, 0.5)',
  },
  '&:nth-of-type(1)': {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.1)',
  },
  borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)',
  width: '320px',
  padding: '12px',
  height: '70px',
});

export const StyledLeftWrapBox = styled(Box)({
  width: '320px',
});

export const StyledRightWrapBox = styled(Box)({
  width: '100%',
});

export const StyledInfoTitle = styled(Typography)({
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '16px',
  color: '#83A9A8',
});

export const StyledInfoValue = styled(Typography)({
  fontWeight: '600',
  fontSize: '12px',
  overflow: 'hidden',
  color: 'rgba(0, 0, 0, 0.3)',
  p: {
    margin: '0px',
  },
});

export const StyledLabel = styled(Typography)({
  fontWeight: '600',
  fontSize: '18px',
  lineHeight: '22px',
  minHeight: '22px',
  color: 'gba(5, 34, 33, 0.8)',
});
