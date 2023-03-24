import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  ProductsHeader,
  ProductsTable,
  ProductsPagination,
} from '@/modules/Products';
import { DashboardLayout } from '@/layouts';
import { useProduct } from '@/hooks';
import { Product } from '@/types';

const ProductsPage = () => {
  const { products, pageInfo, onGetProducts, onUpdateProduct } = useProduct();
  const [searchValue, setSearchValue] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, [searchValue, selectedLocationId, page, rowsPerPage]);

  const fetchProducts = (sort?: string) => {
    onGetProducts({
      filterBy: {
        search: searchValue,
        sort,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };
  const handleUpdateAmount = async (data: Product.Data) => {
    const params: Product.Param & Product.Body = {
      id: data.id,
      input: { amount: data.amount },
    };
    await onUpdateProduct(params);
  };
  return (
    <DashboardLayout title="Products">
      <ProductsHeader
        searchValue={searchValue}
        searchProduct={selectedLocationId}
        onValueChange={setSearchValue}
        onProductChange={setSelectedLocationId}
      />
      <Divider sx={{ mt: '30px' }} />
      <ProductsTable
        productsTableData={products}
        onOrder={(sort) => fetchProducts(sort)}
        onUpdateAmount={handleUpdateAmount}
      />
      <ProductsPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={pageInfo?.total ?? 0}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </DashboardLayout>
  );
};

export default ProductsPage;
