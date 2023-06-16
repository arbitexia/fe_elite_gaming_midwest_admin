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
                  Et in lorem qui ipsum deserunt duis exercitation lorem elit
                  qui qui ipsum tempor nulla velit aliquip enim consequat
                  incididunt pariatur duis excepteur elit irure nulla ipsum
                  dolor dolore est. Aute deserunt nostrud id non ipsum do
                  adipisicing laboris in minim officia magna elit minim mollit
                  elit velit veniam lorem pariatur veniam sit excepteur irure
                  commodo excepteur duis quis in.
                </UIInfoValue>
              </StyledConfigInfoCardContent>
            </UIFlexWrapBox>
          )}

          {currentTab === 1 && (
            <UIFlexWrapBox
              sx={{ alignItems: 'center', height: '180px', ml: 4 }}
            >
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
          )}
        </Box>
      </StyledConfigInfoCard>
    </Box>
  );
};

export default ConfigInfoCard;
