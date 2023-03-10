import React from 'react';
import { styled, Button, SvgIcon, Typography } from '@mui/material';

export const UIDefaultButton = styled(Button)({
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

export const UIEditButton = styled(Button)({
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

export const UIViewButton = styled(Button)({
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

export const UIPhotoAddButton = styled(Button)({
  width: '190px',
  height: '42px',
  background: 'rgba(60, 96, 95, 0.8)',
  border: '1px solid rgba(191, 215, 225, 0.05)',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#FFFFFF',
  '&:hover': {
    background: 'rgba(60, 96, 95, 0.5)',
  },
});

export const UIPhotoEditButton = styled(Button)({
  width: '190px',
  height: '42px',
  background: 'rgba(191, 215, 225, 0.05)',
  border: '2px solid rgba(137, 200, 198, 0.4)',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#008A83',
  '&:hover': {
    color: '#83A9A8',
  },
});
