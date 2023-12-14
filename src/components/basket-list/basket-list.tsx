import { useState } from 'react';
import BasketItem from '../basket-item/basket-item';
import { Product } from '../../types/product-camera-type';
import BasketRemoveItem from '../basket-remove-item-modal/basket-remove-item-modal';

export type BasketListProps = {
  productsInBasket: Product[];
}

function BasketList({productsInBasket}: BasketListProps): JSX.Element {
  const [isRemoveModalOpened, setRemoveModalOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);

  const handleRemoveModalCloseClick = () => {
    setRemoveModalOpened(false);
  };

  return (
    <>
      <ul className="basket__list" data-testid='basket-list'>
        {productsInBasket !== undefined &&
        productsInBasket.map((product) => <BasketItem product={product} key={product.id} onSetOpenedRemoveModal={setRemoveModalOpened} onSetCurrentProduct={setCurrentProduct} />
        )}
      </ul>
      <BasketRemoveItem
        product={currentProduct}
        isOpen={isRemoveModalOpened}
        onCloseClick={handleRemoveModalCloseClick}
      />
    </>
  );
}

export default BasketList;
