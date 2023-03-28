import { useFormik } from 'formik';
import { Box, Typography, Stack } from '@mui/material';
import {
  UIFlexWrapBox,
  UIFlexSpaceBox,
  UIDefaultButton,
} from '@/components/UI';
import { ConfigInputType, ConfigType } from '@/types';
import {
  StyledConfigInfoTitle,
  StyledConfigInfoCard,
  StyledConfigInfoCardHeader,
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
  const configFormik = useFormik({
    initialValues: configData,
    onSubmit: async (values) => {
      onCreateConfig({ input: { ...values, id: configData.id } });
    },
  });

  return (
    <Box component="form" onSubmit={configFormik.handleSubmit}>
      <UIFlexSpaceBox sx={{ mb: '30px' }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 24,
            lineHeight: '17px',
            color: '#06251F',
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
            <UIDefaultButton sx={{ marginLeft: '8px' }} type="submit">
              Save
            </UIDefaultButton>
          </Box>
        </Stack>
      </UIFlexSpaceBox>

      <StyledConfigInfoCard>
        <StyledConfigInfoCardHeader />
        <StyledConfigInfoCardContent>
          <Box flex="1">
            <UIFlexWrapBox sx={{ paddingTop: '20px' }}>
              <Stack direction="column" sx={{ width: '49%', gap: '10px' }}>
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
              </Stack>
            </UIFlexWrapBox>
          </Box>
        </StyledConfigInfoCardContent>
      </StyledConfigInfoCard>
    </Box>
  );
};

export default ConfigInfoCard;
