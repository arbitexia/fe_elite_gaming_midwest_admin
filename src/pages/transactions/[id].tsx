import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/layouts';
import { TransactionType } from '@/types';
import { TransactionDetail } from '@/modules/Transactions';
import { useTransaction } from '@/hooks';

const TransactionsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transactionItem, setTransactionItem] =
    useState<TransactionType.Data>();
  const { transactions } = useTransaction();
  useEffect(() => {
    if (id) {
      setTransactionItem(transactions.find((t) => t.id === Number(id)));
    }
  }, [id]);

  return (
    <DashboardLayout title={'Transaction'}>
      {transactionItem && <TransactionDetail transaction={transactionItem} />}
    </DashboardLayout>
  );
};

export default TransactionsById;
