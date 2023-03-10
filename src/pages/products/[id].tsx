import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UIFlexSpaceBox } from '@/components/UI';
import { useProduct } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import {
  ProductsDetailHeader,
  ProductsDetailCarouselCard,
  ProductsDetailInfoCard,
} from '@/modules/Products';
import { Product } from '@/types';

const ProductsById = () => {
  const router = useRouter();
  const { id } = router.query;
  const { onGetProductById } = useProduct();
  const [productItem, setProductItem] = useState<Product | undefined | null>(
    null
  );

  useEffect(() => {
    setProductItem(onGetProductById(parseInt(id as string)));
  }, [id]);

  return (
    <DashboardLayout title={productItem ? productItem.name : 'Products'}>
      {productItem && (
        <>
          <ProductsDetailHeader name={productItem.name} isEditable={false} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <ProductsDetailCarouselCard />
            <ProductsDetailInfoCard productItem={productItem} />
          </UIFlexSpaceBox>{' '}
        </>
      )}
    </DashboardLayout>
  );
};

export default ProductsById;
