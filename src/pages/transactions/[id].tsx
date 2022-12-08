import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { TransactionType } from '@/types';
import { transactionData } from '@/_mock/transactions';
import { TransactionDetail } from '@/modules/Transactions';

const TransactionsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transactionItem, setTransactionItem] = useState<
    TransactionType | undefined | null
  >(null);
  useEffect(() => {
    setTransactionItem(
      transactionData.find((item) => item.id === parseInt(id as string))
    );
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
