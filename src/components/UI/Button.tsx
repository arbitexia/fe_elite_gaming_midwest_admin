import { styled, Button } from '@mui/material';

export const UIDefaultButton = styled(Button)({
  minWidth: 170,
  height: 40,
  color: '#8794BA',
  textTransform: 'capitalize',
  borderRadius: 4,
  padding: '0 22px',
  border: '1px solid #DCE0E4',
  letterSpacing: '0.15px',
  marginTop: '10px',
});

export const UIAuthButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 15,
  fontWeight: 600,
  padding: '6px 12px',
  border: '1px solid',
  minHeight: 42,
  lineHeight: 1.5,
  color: '#fff',
  minWidth: 170,
  background: 'linear-gradient(180deg, #37D099 0%, #008A83 100%)',
  borderColor: 'none',
  '&:hover': {
    opacity: 0.8,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    background: 'linear-gradient(180deg,#008A83,#37D099)',
    borderColor: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
});
