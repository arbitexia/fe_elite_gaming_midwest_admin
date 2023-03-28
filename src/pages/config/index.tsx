import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { ConfigInfoCard } from '@/modules/Config';
import { DashboardLayout } from '@/layouts';
import { useConfig } from '@/hooks';
import { ConfigInputType } from '@/types';

const ConfigPage = () => {
  const { configItem, onGetConfig, onCreateConfig } = useConfig();
  useEffect(() => {
    if (!configItem) {
      onGetConfig({ locationId: 0 });
    }
  }, [configItem]);
  const handleSaveConfig = async (value: ConfigInputType) => {
    await onCreateConfig(value);
  };
  return (
    <DashboardLayout title="Config">
      <Stack direction="column" spacing={2.5} paddingTop={4}>
        <ConfigInfoCard
          configData={configItem}
          onCreateConfig={handleSaveConfig}
        />
      </Stack>
    </DashboardLayout>
  );
};

export default ConfigPage;
