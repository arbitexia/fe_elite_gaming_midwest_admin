import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import {
  ProductsHeader,
  ProductsTable,
  ProductsPagination,
} from '@/modules/Products';
import { DashboardLayout } from '@/layouts';
import { useProduct } from '@/hooks';

const ProductsPage = () => {
  const { products, pageInfo, onGetProducts } = useProduct();
  const [searchValue, setSearchValue] = useState('');
  const [searchProduct, setSearchProduct] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    handleSearch();
  }, [searchValue, setSearchProduct, page, rowsPerPage]);

  const handleSearch = () => {
    onGetProducts({
      filterBy: {
        product: searchProduct,
        search: searchValue,
        pointFrom: 0,
        pointTo: 1000000,
      },
      cursor: { page: page, size: rowsPerPage },
    });
  };

  return (
    <DashboardLayout title="Products">
      <ProductsHeader
        searchValue={searchValue}
        searchProduct={searchProduct}
        onValueChange={(value: string) => setSearchValue(value)}
        onProductChange={(value: number) => setSearchProduct(value)}
      />
      <Divider sx={{ mt: '30px' }} />
      <ProductsTable productsTableData={products} />
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
