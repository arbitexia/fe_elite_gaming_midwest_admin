import React, { useEffect } from 'react';
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
      <ConfigInfoCard
        configData={configItem}
        onCreateConfig={handleSaveConfig}
      />
    </DashboardLayout>
  );
};

export default ConfigPage;
