import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  RewardsHeader,
  RewardsTable,
  RewardsPagination,
} from '@/modules/Rewards';
import { DashboardLayout } from '@/layouts';
import { Product } from '@/types';
import { useProduct } from '@/hooks';

const RewardsPage = () => {
  const { products, pageInfo, onGetProducts } = useProduct();
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchLocation, setSearchLocation] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    handleSearch();
  }, [searchValue, searchLocation, page, rowsPerPage]);

  const handleSearch = () => {
    onGetProducts({
      filterBy: {
        location: searchLocation,
        search: searchValue,
        pointFrom: 0,
        pointTo: 1000000,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };

  return (
    <DashboardLayout title="Rewards">
      <RewardsHeader
        searchValue={searchValue}
        searchLocation={searchLocation}
        onValueChange={(value: string) => setSearchValue(value)}
        onLocationChange={(value: number) => setSearchLocation(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <RewardsTable rewardsTableData={productList} />
      <RewardsPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default RewardsPage;
