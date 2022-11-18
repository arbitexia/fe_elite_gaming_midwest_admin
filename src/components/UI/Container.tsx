import { styled, Container, ContainerProps } from '@mui/material';

const UIContentWrapper = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  gap: theme.spacing(3),
  width: '100%',
}));

export const UIContainer = ({ children, ...rest }: ContainerProps) => {
  return (
    <UIContentWrapper maxWidth="xl" {...rest}>
      {children}
    </UIContentWrapper>
  );
};
