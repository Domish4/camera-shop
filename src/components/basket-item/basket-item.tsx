import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { Product } from '../../types/product-camera-type';
import { addProduct, decrementProductCount, setCameraCount } from '../../store/shopping-cart/shopping-cart-slice';
import { MAX_PRODUCT, MIN_PRODUCT } from '../../utils/const';
import { getTotalProductPrice } from '../../utils/basket-utils';

export type BasketItemProps = {
    product: Product;
    onSetOpenedRemoveModal?: (arg: boolean) => void;
    onSetCurrentProduct?: (camera: Product) => void;
}

function BasketItem({product, onSetOpenedRemoveModal, onSetCurrentProduct}: BasketItemProps): JSX.Element {
  const {name, vendorCode, category, type, level, price, previewImg, previewImgWebp, previewImg2x, previewImgWebp2x, id, count} = product;


  const dispatch = useAppDispatch();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value > 99) {
      dispatch(setCameraCount({ id: id, count: MAX_PRODUCT }));

      return;
    }

    dispatch(setCameraCount({ id: id, count: Math.round(+value) }));
  };

  const handleBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (+value < 2) {
      dispatch(setCameraCount({ id: id, count: MIN_PRODUCT }));
    }
  };

  const handleDeleteClick = () => {
    if (onSetOpenedRemoveModal && onSetCurrentProduct) {
      onSetOpenedRemoveModal(true);
      onSetCurrentProduct(product);
    }
  };

  const handleIncrementClick = () => {
    dispatch(addProduct(product));
  };

  const handleDecrementClick = () => {

    dispatch(decrementProductCount(product));
  };

  return (
    <li className="basket-item" data-testid='basket-item'>
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
          <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt={name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number"> {vendorCode}</span>
          </li>
          <li className="basket-item__list-item"> {type} {category?.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{price.toLocaleString('RU-ru')} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={count === MIN_PRODUCT}
          onClick={handleDecrementClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          value={count || ''}
          min={MIN_PRODUCT}
          max={MAX_PRODUCT}
          aria-label="количество товара"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={count === MAX_PRODUCT}
          onClick={handleIncrementClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getTotalProductPrice(price, count)}</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleDeleteClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>

  );
}

export default BasketItem;
