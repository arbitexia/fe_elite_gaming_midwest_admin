import { styled, Box } from '@mui/material';
import { UIDefaultTextField } from '@/components/UI';

export const StyledCardBox = styled(Box)({
  width: '255px',
  height: '360px',
  background: '#FFFFFF',
  boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',
  border: ' 2px solid rgba(137, 200, 198, 0.2)',
  borderRadius: '10px',
  padding: '20px',
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
