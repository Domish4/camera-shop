import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header/header';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ReviewBlock from '../../components/review/review-block/review-block';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameraAction, getReviewsAction, getSimilarProductsAction} from '../../store/api-actions';
import { getCamera, getStatus } from '../../store/camera/camera.selectors';
import Loader from '../../components/loader/loader';
import { Status } from '../../utils/const';
import { getSimilarCameras } from '../../store/similar-camera/similar-camera.selectors';
import SimilarCards from '../../components/similar-cards/similar-cards';
import ErrorPage from '../error-page/error-page';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { getSendReviewStatus } from '../../store/review/review.selectors';
import { createPortal } from 'react-dom';
import AddItem from '../../components/modals/add-item/add-item';
import AddItemSuccess from '../../components/modals/add-item-success/add-item-success';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const cameraId = String(id);
  const camera = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilarCameras);
  const cameraStatus = useAppSelector(getStatus);
  const postReviewStatus = useAppSelector(getSendReviewStatus);
  const [openPopup, setOpenPopup] = useState(false);
  const [isAddModalSuccess, setModalSuccess] = useState(false);


  const handleAddModalHide = useCallback(() => {
    setModalSuccess(false);
  },[]);

  const handleModalShow = useCallback((() => {
    setOpenPopup(true);
  }),[]);

  const handleModalHide = useCallback((() => {
    setOpenPopup(false);
  }), []);


  useEffect(() => {
    dispatch(getCameraAction(cameraId));
    dispatch(getSimilarProductsAction(cameraId));
    dispatch(getReviewsAction(cameraId));
  }, [dispatch, cameraId, postReviewStatus.isSuccess]);

  if (cameraStatus === Status.Error) {
    return <ErrorPage />;
  }

  if (!camera) {
    return (<Loader />);
  }

  const handleUpButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const {name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = camera;

  return (
    <div className="wrapper">
      <Header />
      <main data-testid="product-page">
        <div className="page-content">
          <Breadcrumbs name={name}/>
          <div className="page-content__section" >
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
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽</p>
                  <button className="btn btn--purple" type="button" onClick={handleModalShow}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  {openPopup && createPortal(<AddItem setModalSuccess={setModalSuccess} camera={camera} onClosePopup={handleModalHide} isModalOpened={openPopup}/>, document.body)}
                  { isAddModalSuccess && createPortal(<AddItemSuccess isModalOpened={isAddModalSuccess} onCloseModal={handleAddModalHide}/>, document.body)}
                  <ProductTabs camera={camera} />
                </div>
              </div>
            </section>
          </div>
          {similarCameras.length > 0 &&
            <div className="page-content__section">
              <SimilarCards similarCameras={similarCameras}/>
            </div>}
          <div className="page-content__section">
            <ReviewBlock />
          </div>
        </div>
      </main>
      <button className="up-btn" onClick={handleUpButton}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      <Footer />
    </div>
  );
}

export default ProductPage;
