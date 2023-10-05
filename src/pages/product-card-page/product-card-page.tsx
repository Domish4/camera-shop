import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ReviewBlock from '../../components/review-block/review-block';
import SimularCards from '../../components/simular-cards/simular-cards';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameraAction } from '../../store/api-actions';
import { getCamera } from '../../store/camera/camera.selectors';
import Loader from '../../components/loader/loader';

function ProductCardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const cameraId = String(id);
  const camera = useAppSelector(getCamera);

  useEffect(() => {
    dispatch(getCameraAction(cameraId));
  }, [dispatch, cameraId]);

  if (!camera) {
    return (<Loader />);
  }

  const {name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = camera;

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
                    <img src={previewImg} srcSet={previewImg2x} width="280" height="240" alt={name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <div className="rate product__rate">
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
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs />
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <SimularCards />
          </div>
          <div className="page-content__section">
            <ReviewBlock />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
}

export default ProductCardPage;
