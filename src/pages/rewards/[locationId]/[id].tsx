import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UIFlexSpaceBox } from '@/components/UI';
import { useLocation, useProduct, useReward } from '@/hooks';
import { DashboardLayout } from '@/layouts';
import { ProductsDetailCarouselCard } from '@/modules/Products';
import {
  ProductDetailHeader,
  ProductsDetailInfoCard,
  ProductsTable,
} from '@/modules/Rewards';
import { Location, Product } from '@/types';

const RewardById = () => {
  const router = useRouter();
  const { locationId, id } = router.query;
  const { locations } = useLocation();
  const { onGetProductById } = useProduct();
  const { products, onGetProductsByLocationId } = useReward();
  const [productItem, setProductItem] = useState<Product | undefined | null>(
    null
  );
  const [locationItem, setLocationItem] = useState<Location | undefined | null>(
    null
  );

  useEffect(() => {
    if (id) setProductItem(onGetProductById(parseInt(id as string)));
  }, [id]);

  useEffect(() => {
    if (parseInt(locationId as string) > 0) {
      setLocationItem(
        locations.find(
          (location) => location.id === parseInt(locationId as string)
        )
      );
      onGetProductsByLocationId(parseInt(locationId as string));
    }
  }, [locationId]);

  return (
    <DashboardLayout title={productItem ? productItem.name : 'Products'}>
      {productItem && (
        <>
          <ProductDetailHeader name={productItem.name} isEditable={false} />
          <UIFlexSpaceBox sx={{ gap: '20px' }}>
            <ProductsDetailCarouselCard />
            <ProductsDetailInfoCard
              productItem={productItem}
              location={locationItem}
            />
          </UIFlexSpaceBox>
        </>
      )}
      <ProductsTable
        productsTableData={products.filter(
          (product) => product.id !== productItem?.id
        )}
      />
    </DashboardLayout>
  );
};

export default RewardById;
