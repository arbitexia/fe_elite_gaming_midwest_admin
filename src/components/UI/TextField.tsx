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

export const UISearchTextField = styled(UIDefaultTextField)({
  width: '250px',
  height: '40px',
  '.MuiOutlinedInput-input': {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    color: '#B7B7B7',
  },
});

export const UIEditTextField = styled(TextField)({
  '.MuiTextField-root': {
    '&:focus-visible': {
      outline: 'none',
    },
  },
  'textArea,input,.MuiSelect-select': {
    padding: 0,
  },
  '.MuiOutlinedInput-root': {
    padding: '8px 14px',
    borderRadius: '8px',
    background: '#FFFFFF',
    color: '#222B35',
    border: 'none',
    outline: 'none',
    '&:focus-visible': {
      border: 'none',
    },
  },
  '.MuiInputLabel-root': {
    color: '#222B35',
    '&.Mui-focused': {
      color: '#222B35',
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(137, 200, 198, 0.3) !important',
  },
  '.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(137, 200, 198, 0.3) !important',
  },
});
