import { UIFlexSpaceBox } from '@/components/UI';
import { Typography } from '@mui/material';

export interface UIListHeaderProps {
  title: string;
  children: React.ReactNode;
}

export const UIListHeader = ({ title, children }: UIListHeaderProps) => {
  return (
    <UIFlexSpaceBox>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 36,
          lineHeight: '54px',
          color: '#89C8C6',
        }}
      >
        {title && `${title.charAt(0).toUpperCase() + title.slice(1)}`}
      </Typography>
      {children}
    </UIFlexSpaceBox>
  );
};
