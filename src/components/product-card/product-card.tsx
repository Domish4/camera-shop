import { Link, generatePath } from 'react-router-dom';
import { Product } from '../../types/product-camera-type';
import { AppRoute } from '../../utils/const';
import AddItem from '../add-item/add-item';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

export type ProductCardProps = {
  camera: Product;
  className: string;
}

function ProductCard({camera, className}: ProductCardProps): JSX.Element {
  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, price, id, reviewCount} = camera;
  const [openPopup, setOpenPopup] = useState(false);

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
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleModalShow}>
          Купить
        </button>
        {openPopup && createPortal(<AddItem camera={camera} onClosePopup={handleModalHide} isModalOpened={openPopup}/>, document.body)}
        <Link to={generatePath(AppRoute.Product, { id: id.toString() })} className="btn btn--transparent">Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
