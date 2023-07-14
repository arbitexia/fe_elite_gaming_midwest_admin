import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Typography,
  Stack,
  Divider,
  InputAdornment,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import { SecurityUpdateGood, Schedule } from '@mui/icons-material';
import {
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIDefaultButton,
  UIInfoTitle,
  UIInfoValue,
} from '@/components/UI';
import { ConfigInputType, ConfigType } from '@/types';
import {
  StyledConfigInfoTitle,
  StyledConfigInfoCard,
  StyledConfigInfoCardContent,
  StyledConfigEditTextField,
} from './ui';

interface ConfigInfoCardProps {
  configData: ConfigType;
  onCreateConfig: (value: ConfigInputType) => void;
}

const ConfigInfoCard = ({
  configData,
  onCreateConfig,
}: ConfigInfoCardProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const configFormik = useFormik({
    initialValues: configData,
    onSubmit: async (values) => {
      onCreateConfig({ input: { ...values, id: configData.id } });
    },
  });

  return (
    <Box component="form" onSubmit={configFormik.handleSubmit}>
      <UIFlexSpaceBox>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 36,
            lineHeight: '54px',
            color: '#89C8C6',
          }}
        >
          Settings/Config
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <UIDefaultButton
              sx={{ minWidth: '110px', borderRadius: '8px' }}
              type="submit"
            >
              Save
            </UIDefaultButton>
          </Box>
        </Stack>
      </UIFlexSpaceBox>
      <Divider sx={{ my: '18px' }} />

      <StyledConfigInfoCard>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            height: '100%',
          }}
        >
          <Tabs
            value={currentTab}
            orientation="vertical"
            onChange={(event: React.SyntheticEvent, newValue: number) =>
              setCurrentTab(newValue)
            }
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              minWidth: 'max-content',
            }}
          >
            <Tab
              label="Checkin"
              sx={{
                justifyContent: 'flex-start',
                mt: 2,
                mx: 2,
                minHeight: '40px',
              }}
              icon={<Schedule sx={{ width: '18px', mb: '2px' }} />}
              iconPosition="start"
            />
            <Tab
              label="Back office"
              sx={{ justifyContent: 'flex-start', mx: 2, minHeight: '48px' }}
              icon={<SecurityUpdateGood sx={{ width: '18px', mb: '2px' }} />}
              iconPosition="start"
            />
          </Tabs>

          {currentTab === 0 && (
            <UIFlexWrapBox sx={{ flexWrap: 'nowrap', ml: 4 }}>
              <StyledConfigInfoCardContent>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledConfigInfoTitle>Daily:</StyledConfigInfoTitle>
                  <StyledConfigEditTextField
                    type="number"
                    name="daily"
                    value={configFormik.values.daily}
                    onChange={configFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledConfigInfoTitle>Weekly:</StyledConfigInfoTitle>
                  <StyledConfigEditTextField
                    type="number"
                    name="weekly"
                    value={configFormik.values.weekly}
                    onChange={configFormik.handleChange}
                  />
                </UIFlexWrapBox>
                <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                  <StyledConfigInfoTitle>Monthly:</StyledConfigInfoTitle>
                  <StyledConfigEditTextField
                    type="number"
                    name="monthly"
                    value={configFormik.values.monthly}
                    onChange={configFormik.handleChange}
                  />
                </UIFlexWrapBox>
              </StyledConfigInfoCardContent>
              <StyledConfigInfoCardContent>
                <UIInfoTitle>Description</UIInfoTitle>
                <UIInfoValue sx={{ pr: 4 }}>
                  On the settings page, have three different point allocations
                  available for customers when they check in on the tablet:
                  daily, weekly, and monthly. Daily Points: Customers receive{' '}
                  {configData.daily} points every day when they check in on the
                  tablet. Weekly Points: In addition to the daily points,
                  customers also receive {configData.weekly} points on a weekly
                  basis. Monthly Points: Alongside the daily and weekly points,
                  customers are rewarded with {configData.monthly} points at the
                  beginning of each month.
                </UIInfoValue>
              </StyledConfigInfoCardContent>
            </UIFlexWrapBox>
          )}

          {currentTab === 1 && (
            <Box sx={{ ml: 4, mt: 6 }}>
              <UIFlexWrapBox sx={{ alignItems: 'center', my: 4 }}>
                <Typography>Customers can request a coupon of</Typography>
                <TextField
                  variant="standard"
                  type="number"
                  name="requestCoupon"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={configFormik.values?.requestCoupon ?? 0}
                  onChange={configFormik.handleChange}
                  sx={{ width: '120px' }}
                />
              </UIFlexWrapBox>

              <UIFlexWrapBox sx={{ alignItems: 'center', my: 4 }}>
                <Typography>Customers will receive a coupon of</Typography>
                <TextField
                  variant="standard"
                  type="number"
                  name="initialCoupon"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={configFormik.values?.initialCoupon ?? 0}
                  onChange={configFormik.handleChange}
                  sx={{ width: '120px' }}
                />
                <Typography>upon signing up.</Typography>
              </UIFlexWrapBox>

              <UIFlexWrapBox sx={{ alignItems: 'center' }}>
                <Typography>Customers get</Typography>
                <TextField
                  variant="standard"
                  type="number"
                  name="coupon"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={configFormik.values?.coupon ?? 0}
                  onChange={configFormik.handleChange}
                  sx={{ width: '120px' }}
                />
                <Typography>freeplay when they check in for</Typography>
                <TextField
                  variant="standard"
                  type="number"
                  name="checkinThreshold"
                  value={configFormik.values?.checkinThreshold ?? 0}
                  onChange={configFormik.handleChange}
                  sx={{ width: '80px' }}
                />
                <Typography>times.</Typography>
              </UIFlexWrapBox>
            </Box>
          )}
        </Box>
      </StyledConfigInfoCard>
    </Box>
  );
};

export default ConfigInfoCard;
