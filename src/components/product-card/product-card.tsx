import { Link, generatePath } from 'react-router-dom';
import { Product } from '../../types/product-camera-type';
import { AppRoute } from '../../utils/const';
import AddItem from '../modals/add-item/add-item';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import AddItemSuccess from '../modals/add-item-success/add-item-success';
import { useAppSelector } from '../../hooks';
import { getShopCartCameras } from '../../store/shopping-cart/shopping-cart-selectors';

export type ProductCardProps = {
  camera: Product;
  className: string;
}

function ProductCard({camera, className}: ProductCardProps): JSX.Element {
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, id, reviewCount} = camera;
  const [openPopup, setOpenPopup] = useState(false);
  const [isAddModalSuccess, setModalSuccess] = useState(false);
  const shopCartCameras = useAppSelector(getShopCartCameras);
  const inShoppingCart = shopCartCameras.find((cameras) => cameras.id === camera.id);


  const handleAddModalHide = useCallback(() => {
    setModalSuccess(false);
  },[]);

  const handleModalShow = useCallback((() => {
    setOpenPopup(true);
  }),[]);

  const handleModalHide = useCallback((() => {
    setOpenPopup(false);
  }), []);


  return (
    <div className={className} data-testid='product-card'>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
          <img src={previewImg} srcSet={previewImg2x} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        { inShoppingCart ?
          <Link className="btn btn--purple-border" to={AppRoute.ShopCart}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>
          :
          <button className="btn btn--purple product-card__btn" type="button" onClick={handleModalShow}>
          Купить
          </button> }
        {openPopup && createPortal(<AddItem setModalSuccess={setModalSuccess} camera={camera} onClosePopup={handleModalHide} isModalOpened={openPopup}/>, document.body)}
        { isAddModalSuccess && createPortal(<AddItemSuccess isModalOpened={isAddModalSuccess} onCloseModal={handleAddModalHide}/>, document.body)}
        <Link to={generatePath(AppRoute.Product, { id: id.toString() })} className="btn btn--transparent">Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
