import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { AwardType } from '@/types';
import { TransactionDetail } from '@/modules/Transactions';
import { useAward } from '@/hooks';

const TransactionsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { onGetAwardById } = useAward();
  const [transactionItem, setTransactionItem] = useState<
    AwardType | undefined | null
  >(null);
  useEffect(() => {
    setTransactionItem(onGetAwardById(parseInt(id as string)));
  }, [id]);
  return (
    <DashboardLayout title={'Transaction'}>
      {transactionItem && (
        <TransactionDetail transactionItem={transactionItem} />
      )}
    </DashboardLayout>
  );
};

export default TransactionsById;
