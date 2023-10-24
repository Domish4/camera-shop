import { Link } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch} from '../../hooks';
import { getCatalogAction, getPromoAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { AppRoute } from '../../utils/const';


function CatalogMain(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCatalogAction());
    dispatch(getPromoAction());
  }, [dispatch]);


  return (
    <div className="wrapper" data-testid='catalog-main'>
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.Main} className="breadcrumbs__link">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <Catalog />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogMain;
