import { useAppDispatch } from '../../../hooks';
import { removeProduct } from '../../../store/shopping-cart/shopping-cart-slice';
import { Product } from '../../../types/product-camera-type';
import Modal from '../modal/modal';
import './basket.css';

export type BasketItemRemoveProps = {
  product: Product;
  isOpen: boolean;
  onCloseClick: () => void;
}

function BasketRemoveItem({product, isOpen, onCloseClick}: BasketItemRemoveProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, vendorCode, type, level, category} = product;

  const categoryToLowerCase = category || '';

  const handleClick = () => {
    dispatch(removeProduct(product));
    onCloseClick();
  };

  return (
    <Modal isModalOpened={isOpen} onCloseClick={onCloseClick}>
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
            <img
              src={previewImg}
              srcSet={previewImg2x}
              width="140"
              height="120"
              alt={name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type} {categoryToLowerCase?.toLowerCase()} </li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={handleClick}
        >
          Удалить
        </button>
        <button
          className="btn btn--transparent modal__btn modal__btn--half-width"
          onClick={onCloseClick}
        >
          Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}

export default BasketRemoveItem;
