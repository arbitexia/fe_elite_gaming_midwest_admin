import { styled, Box, Button } from '@mui/material';
import { UIDefaultTextField } from '@/components/UI';

export const StyledCardBox = styled(Box)({
  width: '254px',
  height: '360px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',
  border: ' 2px solid rgba(137, 200, 198, 0.2)',
  borderRadius: '10px',
  padding: '15px 17px',
  '&:hover': {
    border: '2px solid rgba(137, 200, 198, 0.25)',
    backdropFilter: 'blur(15px)',
    filter: 'drop-shadow(0px 4px 50px rgba(0, 0, 0, 0.25))',
  },
});

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

export const StyledLocationEditButton = styled(Button)({
  width: '105px',
  height: '42px',
  background: 'rgba(137, 200, 198, 0.2)',
  border: '1px solid rgba(191, 215, 225, 0.05)',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#83A9A8',
  '&:hover': {
    color: '#FFFFFF',
    background: '#008A83',
    border: '1px solid rgba(191, 215, 225, 0.05)',
  },
});

export const StyledLocationViewButton = styled(Button)({
  width: '105px',
  height: '42px',
  background: 'rgba(191, 215, 225, 0.05)',
  border: '2px solid rgba(137, 200, 198, 0.2)',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#83A9A8',
  '&:hover': {
    color: '#008A83',
    border: '2px solid rgba(137, 200, 198, 0.5)',
  },
});
