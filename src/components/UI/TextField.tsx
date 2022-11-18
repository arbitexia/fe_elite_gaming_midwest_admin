import { styled, TextField } from '@mui/material';

export const UIAuthTextField = styled(TextField)(() => ({
  width: '100%',
  '.MuiTextField-root': {
    '&:focus-visible': {
      outline: 'none',
    },
  },

  '.MuiOutlinedInput-root': {
    borderRadius: '4px',
    background: 'rgba(137, 200, 198, 0.1)',
    color: '#83A9A8',
    border: 'none',
    outline: 'none',

    '&:focus-visible': {
      border: 'none',
    },
  },

  '.MuiInputLabel-root': {
    color: '#83A9A8',

    '&.Mui-focused': {
      color: '#83A9A8',
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(137, 200, 198, 0.3) !important',
  },
  '.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(137, 200, 198, 0.3) !important',
  },
}));

export const UIDefaultTextField = styled(TextField)({
  height: '40px',
  minWidth: '100px',
  '.MuiTextField-root': {
    '&:focus-visible': {
      outline: 'none',
    },
  },

  '.MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: 'rgba(137, 200, 198, 0.1)',
    color: '#83A9A8',
    border: 'none',
    outline: 'none',

    '&:focus-visible': {
      border: 'none',
    },
  },

  '.MuiInputLabel-root': {
    color: '#83A9A8',

    '&.Mui-focused': {
      color: '#83A9A8',
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(137, 200, 198, 0.05) !important',
  },
  '.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(137, 200, 198, 0.05) !important',
  },
});
