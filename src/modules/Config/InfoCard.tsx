import { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Divider } from '@mui/material';
import { SecurityUpdateGood, Schedule } from '@mui/icons-material';
import { BackOfficeType, ConfigInputType, ConfigType } from '@/types';
import { StyledConfigInfoCard } from './ui';
import CheckinTabPanel from './Detail/CheckinTabPanel';
import ConfigHeader from './Header';
import { useFormik } from 'formik';
import BackOfficeTabPanel from './Detail/BackOfficeTabPanel';
interface ConfigInfoCardProps {
  configData: ConfigType;
  backOfficeData: BackOfficeType[];
  onSaveConfig: (value: ConfigInputType) => void;
  onSaveBackOffice: (value: BackOfficeType[]) => void;
}

const ConfigInfoCard = ({
  configData,
  backOfficeData,
  onSaveConfig,
  onSaveBackOffice,
}: ConfigInfoCardProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [backOfficeValues, setBackOfficeValues] =
    useState<BackOfficeType[]>(backOfficeData);

  useEffect(() => {
    setBackOfficeValues(backOfficeData);
  }, [backOfficeData]);

  const configFormik = useFormik({
    initialValues: configData,
    onSubmit: (values) => {
      onSaveConfig({ input: { ...values, id: configData.id } });
    },
  });

  const handleClickSave = () => {
    if (currentTab === 0) {
      configFormik.handleSubmit();
    } else {
      onSaveBackOffice(backOfficeValues);
    }
  };
  return (
    <Box>
      <ConfigHeader onSave={handleClickSave} />
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
            <CheckinTabPanel
              configData={configData}
              configFormik={configFormik}
            />
          )}

          {currentTab === 1 && (
            <BackOfficeTabPanel
              backOfficeValues={backOfficeValues}
              setBackOfficeValues={setBackOfficeValues}
            />
          )}
        </Box>
      </StyledConfigInfoCard>
    </Box>
  );
};

export default ConfigInfoCard;
