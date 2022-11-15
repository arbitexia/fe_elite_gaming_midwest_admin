import { styled, Button, Box } from '@mui/material';

export type StyledNavButtonProp = {
  btnType: string;
};

export const StyledNavButton = styled(Button)<StyledNavButtonProp>(
  ({ btnType }) => ({
    background:
      btnType === 'Signup'
        ? 'radial-gradient(300.75% 955.63% at 85.18% 5.81%, rgba(0, 255, 148, 0.16) 0%, rgba(255, 255, 255, 0.002) 100%), radial-gradient(97.65% 173.77% at -3.15% 77.15%, rgba(14, 71, 112, 0.2) 0%, rgba(24, 77, 89, 0.2) 23.15%, rgba(17, 54, 81, 0) 100%), #001817'
        : btnType === 'Login'
        ? 'rgba(191, 215, 225, 0.05)'
        : 'transparent',
    border:
      btnType === 'Signup'
        ? '1px solid rgba(191, 215, 225, 0.05)'
        : btnType === 'Login'
        ? '1px solid rgba(137, 200, 198, 0.2)'
        : 'transparent',
    borderRadius: '8px',
    width: '100px',
    height: '42px',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    color: '#03543F',
  })
);

export const StyledAvatarWrapper = styled(Box)(() => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(137, 200, 198, 0.15);',
  border: '2px solid rgba(82, 192, 199, 0.2)',
  borderRadius: '50%',
}));

export const activeButton = {
  color: '#04A49C',
  fontWeight: '700',
};
