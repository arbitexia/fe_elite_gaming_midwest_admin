import React, { useEffect, useState } from 'react';
import { ConfigInfoCard } from '@/modules/Config';
import { DashboardLayout } from '@/layouts';
import { useConfig } from '@/hooks';
import { ConfigInputType } from '@/types';
import { useAppToast } from '@/providers';

const ConfigPage = () => {
  const { configItem, onGetConfig, onCreateConfig } = useConfig();
  const [isChanged, setIsChanged] = useState(true);
  const appToast = useAppToast();

  useEffect(() => {
    if (isChanged) {
      onGetConfig({ locationId: 0 });
      setIsChanged(false);
    }
  }, [isChanged]);
  const handleSaveConfig = async (value: ConfigInputType) => {
    // console.log(value);
    await onCreateConfig(value);
    setIsChanged(true);
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
