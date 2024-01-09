import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header/header';
import { AppRoute } from '../../utils/const';
import BasketList from '../../components/basket/basket-list/basket-list';
import BasketSummary from '../../components/basket/basket-summary/basket-summary';
import { createPortal } from 'react-dom';
import ModalProductBasketSuccess from '../../components/modals/basket-success-modal/basket-success-modal';
import { getShopCartCameras } from '../../store/shopping-cart/shopping-cart-selectors';
import { useAppSelector } from '../../hooks';

function ShoppingCart(): JSX.Element {
  const productsInBasket = useAppSelector(getShopCartCameras);

  return (
    <div className="wrapper" data-testid='shopping-cart'>
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.Catalog} className="breadcrumbs__link" >Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.Catalog} className="breadcrumbs__link">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList productsInBasket={productsInBasket}/>
              <BasketSummary />
              {createPortal(<ModalProductBasketSuccess />, document.body)}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingCart;

