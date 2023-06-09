import React, { useEffect } from 'react';
import { ConfigInfoCard } from '@/modules/Config';
import { DashboardLayout } from '@/layouts';
import { useConfig } from '@/hooks';
import { ConfigInputType } from '@/types';
import { useAppToast } from '@/providers';

const ConfigPage = () => {
  const { configItem, onGetConfig, onCreateConfig } = useConfig();
  const appToast = useAppToast();

  useEffect(() => {
    if (!configItem) {
      onGetConfig({ locationId: 0 });
    }
  }, [configItem]);

  const handleSaveConfig = async (value: ConfigInputType) => {
    await onCreateConfig(value);
    appToast({ severity: 'success', message: 'Config has been updated.' });
  };

  return (
    <DashboardLayout title="Config">
      {configItem && (
        <ConfigInfoCard
          configData={configItem}
          onCreateConfig={handleSaveConfig}
        />
      )}
    </DashboardLayout>
  );
};

export default ConfigPage;
