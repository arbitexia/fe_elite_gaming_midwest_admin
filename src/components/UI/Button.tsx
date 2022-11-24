import React from 'react';
import { styled, Button, SvgIcon, Typography } from '@mui/material';

export const UIDefaultButton = styled(Button)({
  minWidth: 100,
  height: 40,
  color: '#8794BA',
  textTransform: 'none',
  borderRadius: 8,
  padding: '0 22px',
  border: '2px solid rgba(137, 200, 198, 0.2)',
  letterSpacing: '0.15px',
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

type UIActionButtonProps = {
  handleClick(event: React.MouseEvent<HTMLButtonElement>): void;
  icon: React.ReactNode | React.ReactNode[];
  color: string;
  title: string;
};

export const UIActionButton = ({
  handleClick,
  icon,
  color,
  title,
}: UIActionButtonProps) => {
  return (
    <Button onClick={handleClick} sx={{ marginLeft: 3, textTransform: 'none' }}>
      <SvgIcon sx={{ color: { color }, width: '17px', height: '17px' }}>
        {icon}
      </SvgIcon>
      <Typography
        sx={{
          color: { color },
          fontSize: '13px',
          fontWeight: 700,
          marginLeft: '8px',
          lineHeight: '14px',
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};
