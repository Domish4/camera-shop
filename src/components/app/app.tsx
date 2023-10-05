import { Routes, Route } from 'react-router-dom';
import CatalogMain from '../../pages/catalog-main/catalog-main';
import ProductCardPage from '../../pages/product-card-page/product-card-page';
import ErrorPage from '../../pages/error-page/error-page';
import ShoppingCart from '../../pages/shopping-cart/shopping-cart';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../utils/const';
import MainPage from '../../pages/main-page/main-page';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Catalog} element={<CatalogMain />} />
        <Route path={AppRoute.Product} element={<ProductCardPage />} />
        <Route path={'/shopping-card'} element={<ShoppingCart />} />
        <Route path='/*' element={<ErrorPage />}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
