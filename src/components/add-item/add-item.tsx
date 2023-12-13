import { useAppDispatch } from '../../hooks';
import {addProduct } from '../../store/shopping-cart/shopping-cart-slice';
import { Product } from '../../types/product-camera-type';
import Modal from '../modal/modal';

export type AddItemProps = {
    onClosePopup: () => void;
    isModalOpened: boolean;
    camera: Product;
    setModalSuccess: (arg: boolean) => void;

}

function AddItem({onClosePopup, isModalOpened, camera, setModalSuccess}: AddItemProps): JSX.Element {
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, vendorCode, type, level, price} = camera;
  const dispatch = useAppDispatch();


  const handleClick = () => {
    dispatch(addProduct(camera));
    setModalSuccess(true);
    onClosePopup();
  };


  return (

    <Modal isModalOpened={isModalOpened} onCloseClick={onClosePopup}>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short" data-testid='basket-item-modal'>
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
            <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt={name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>
              <span className="basket-item__number"> {vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type}</li>
            <li className="basket-item__list-item">{level}</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button onClick={handleClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onClosePopup()}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </Modal>


  );
}

export default AddItem;

