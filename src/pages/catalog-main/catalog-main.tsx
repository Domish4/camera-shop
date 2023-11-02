import Banner from '../../components/banner/banner';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch} from '../../hooks';
import { getCatalogAction, getPromoAction } from '../../store/api-actions';
import { useEffect } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';


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
          <Breadcrumbs name={'Каталог'}/>
          <Catalog />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogMain;
