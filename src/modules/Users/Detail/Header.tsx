import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Replay as ReplayIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import {
  UIActionButton,
  UIDefaultButton,
  UIFlexSpaceBox,
  UIFlexWrapBox,
} from '@/components/UI';
import { UserType } from '@/types';
import { useRouter } from 'next/router';
import { UserRole } from '@/constants/Enum';
import { StyledUserInfoTitle, StyledUserEditTextField } from './ui';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useUser } from '@/hooks';
import { useAppToast } from '@/providers';

interface UsersDetailHeaderProps {
  user: UserType.User;
}
export const ChangePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const UsersDetailHeader = ({ user }: UsersDetailHeaderProps) => {
  const router = useRouter();
  const { slug, id } = router.query;
  const appToast = useAppToast();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isEdit = router.asPath.includes('edit');
  const isCreate = router.asPath.includes('create');
  const { onChangePassword } = useUser();
  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      let error = '';
      await ChangePasswordSchema.validate(values).catch((e) => {
        error = e.message;
      });
      if (error) {
        appToast({
          severity: 'error',
          message: error,
        });
        return;
      }
      await onChangePassword({
        userId: user.id,
        oldPassword: values.oldPassword,
        password: values.newPassword,
      });
      setOpenPasswordModal(false);
    },
  });
  const handleCancel = () => {
    setOpenDeleteModal(false);
    setOpenPasswordModal(false);
  };
  const handleOk = () => {
    setOpenDeleteModal(false);
  };
  return (
    <Box sx={{ mb: '30px' }}>
      {user && (
        <UIFlexSpaceBox>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 24,
              lineHeight: '17px',
              color: '#06251F',
            }}
          >
            {user.id === 0 ? 'Create User' : `${user.userName}'s Information`}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {isEdit && user.role?.shortCode !== UserRole.CUSTOMER && (
                <UIActionButton
                  icon={<ReplayIcon />}
                  color="#667180"
                  title="Change password"
                  handleClick={() => setOpenPasswordModal(true)}
                />
              )}
              {isEdit || isCreate ? (
                <UIDefaultButton sx={{ marginLeft: '8px' }} type="submit">
                  Save
                </UIDefaultButton>
              ) : (
                <>
                  <UIActionButton
                    icon={<EditIcon />}
                    color="#28B446"
                    title="Edit"
                    handleClick={() => {
                      router.push(`/users/${slug}/edit/${id}`);
                    }}
                  />
                  <UIActionButton
                    icon={<DeleteIcon />}
                    color="#F14336"
                    title="Delete"
                    handleClick={() => setOpenDeleteModal(true)}
                  />
                </>
              )}
            </Box>
          </Stack>
          <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={openDeleteModal}
          >
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete User?</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={openPasswordModal}
          >
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <Stack
                component="form"
                onSubmit={passwordFormik.handleSubmit}
                sx={{ gap: '20px', mt: '20px' }}
              >
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle sx={{ width: '130px' }}>
                    Old Password:
                  </StyledUserInfoTitle>
                  <StyledUserEditTextField
                    size="small"
                    type={showOldPassword ? 'text' : 'password'}
                    autoComplete="old-password"
                    id="oldPassword"
                    name="oldPassword"
                    value={passwordFormik.values.oldPassword}
                    onChange={passwordFormik.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          >
                            {showOldPassword ? (
                              <VisibilityOffOutlinedIcon
                                sx={{ color: '#DCE0E4' }}
                              />
                            ) : (
                              <VisibilityOutlinedIcon
                                sx={{ color: '#DCE0E4' }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle sx={{ width: '130px' }}>
                    New Password:
                  </StyledUserInfoTitle>
                  <StyledUserEditTextField
                    size="small"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordFormik.values.newPassword}
                    onChange={passwordFormik.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon
                                sx={{ color: '#DCE0E4' }}
                              />
                            ) : (
                              <VisibilityOutlinedIcon
                                sx={{ color: '#DCE0E4' }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledUserInfoTitle sx={{ width: '130px' }}>
                    Confirm Password:
                  </StyledUserInfoTitle>
                  <StyledUserEditTextField
                    size="small"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="confirm-password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordFormik.values.confirmPassword}
                    onChange={passwordFormik.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffOutlinedIcon
                                sx={{ color: '#DCE0E4' }}
                              />
                            ) : (
                              <VisibilityOutlinedIcon
                                sx={{ color: '#DCE0E4' }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </UIFlexWrapBox>
                <Button type="submit">Change</Button>
                <Button autoFocus onClick={handleCancel}>
                  Cancel
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </UIFlexSpaceBox>
      )}
    </Box>
  );
};

export default UsersDetailHeader;
