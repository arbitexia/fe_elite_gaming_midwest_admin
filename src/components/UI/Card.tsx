import { styled, Stack, Paper } from '@mui/material';

export type DefaultChildProps = {
  children: React.ReactNode | React.ReactNode[];
  sx?: object;
  spacing?: number;
  ref?: React.RefObject<HTMLInputElement>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: 'outlined' | 'elevation';
  elevation?: number;
};

export const UIStyledCard = styled(Paper)(({ theme }) => ({
  width: 760,
  borderRadius: 20,
  backgrond: 'rgba(0, 0, 0, 0.6)',
  boxShadow: '0px 15px 50px -18px rgba(25, 42, 89, 0.2)',
  padding: '100px 64px',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    minHeight: '600px',
    borderRadius: 0,
    padding: '32px 20px',
    boxShadow: 'none',
  },
}));

export const UIAuthCardWrapper = ({ children }: DefaultChildProps) => {
  return (
    <Stack spacing={4} sx={{ width: 480 }} component={UIStyledCard}>
      {children}
    </Stack>
  );
};

export const UIWhiteCard = ({
  children,
  sx,
  spacing,
  ...rest
}: DefaultChildProps) => (
  <Stack
    component={Paper}
    spacing={spacing || 3}
    sx={{ position: 'relative', padding: 3, ...sx }}
    {...rest}
  >
    {children}
  </Stack>
);
