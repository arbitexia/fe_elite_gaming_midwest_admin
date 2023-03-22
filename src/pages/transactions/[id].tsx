import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { TransactionType } from '@/types';
// import { transactionData } from '@/_mock/transactions';
import { TransactionDetail } from '@/modules/Transactions';
import { useAward } from '@/hooks/award';

const TransactionsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transactionItem, setTransactionItem] = useState<
    TransactionType | undefined | null
  >(null);
  const { awards, onGetAwardById } = useAward();
  useEffect(() => {
    if (id) {
      onGetAwardById(Number(id));
    }
  }, [id]);

  return (
    <DashboardLayout title={'Transaction'}>
      <TransactionDetail transactionItem={awards[0]} />
    </DashboardLayout>
  );
};

export default TransactionsById;
