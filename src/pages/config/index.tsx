import React, { useEffect, useState } from 'react';
import { ConfigInfoCard } from '@/modules/Config';
import { DashboardLayout } from '@/layouts';
import { useConfig } from '@/hooks';
import { BackOfficeType, ConfigInputType } from '@/types';
import { useAppToast } from '@/providers';

const initialBackOffice: BackOfficeType[] = [
  {
    id: 1,
    coupon: 5,
    checkinThreshold: 5,
    days: 10,
    type: 'FREE',
    status: 0,
  },
  {
    id: 2,
    coupon: 5,
    checkinThreshold: 6,
    days: 10,
    type: 'FREE',
    status: 0,
  },
  {
    id: 3,
    coupon: 5,
    checkinThreshold: 7,
    days: 10,
    type: 'FREE',
    status: 0,
  },
  {
    id: 4,
    coupon: 5,
    checkinThreshold: 8,
    days: 10,
    type: 'FREE',
    status: 0,
  },
  {
    id: 5,
    coupon: 5,
    checkinThreshold: 9,
    days: 10,
    type: 'FREE',
    status: 0,
  },
  {
    id: 6,
    coupon: 5,
    checkinThreshold: 10,
    days: 10,
    type: 'FREE',
    status: 0,
  },
  {
    id: 7,
    coupon: 5,
    checkinThreshold: 11,
    days: 10,
    type: 'FREE',
    status: 0,
  },
  {
    id: 8,
    coupon: 5,
    checkinThreshold: 12,
    days: 10,
    type: 'MATCH',
    status: 0,
  },
  {
    id: 9,
    coupon: 5,
    checkinThreshold: 13,
    days: 10,
    type: 'MATCH',
    status: 0,
  },
];

const ConfigPage = () => {
  const {
    configItem,
    backOfficeItems,
    onGetBackOffice,
    onSaveBackOffice,
    onGetConfig,
    onSaveConfig,
  } = useConfig();
  const [isChanged, setIsChanged] = useState(true);
  const [isAlert, setIsAlert] = useState(false);
  const appToast = useAppToast();
  useEffect(() => {
    if (isChanged) {
      onGetConfig({ locationId: 0 });
      onGetBackOffice();
      setIsChanged(false);
    }
  }, [isChanged]);

  useEffect(() => {
    if (backOfficeItems && backOfficeItems.length <= 0) {
      onSaveBackOffice(initialBackOffice);
      setIsChanged(true);
    }
  }, [backOfficeItems]);

  useEffect(() => {
    if (isAlert) {
      appToast({ severity: 'error', message: 'The value 0 cannot be saved' });
      setIsAlert(false);
    }
  }, [isAlert]);

  const handleSaveConfig = async (value: ConfigInputType) => {
    await onSaveConfig(value);
    setIsChanged(true);
    appToast({ severity: 'success', message: 'Config has been updated.' });
  };

  const handleSaveBackOffice = (values: BackOfficeType[]) => {
    const unValidatedData = values.filter(
      (obj) => obj.coupon === 0 || obj.days === 0 || obj.checkinThreshold === 0
    );
    if (unValidatedData.length > 0) {
      setIsAlert(true);
    } else {
      onSaveBackOffice(values);
      setIsChanged(true);
    }
  };
  return (
    <DashboardLayout title="Config">
      {configItem && backOfficeItems && (
        <ConfigInfoCard
          configData={configItem}
          onSaveConfig={handleSaveConfig}
          backOfficeData={backOfficeItems}
          onSaveBackOffice={handleSaveBackOffice}
        />
      )}
    </DashboardLayout>
  );
};

export default ConfigPage;
