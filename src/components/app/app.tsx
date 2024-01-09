import { Routes, Route, useLocation } from 'react-router-dom';
import CatalogMain from '../../pages/catalog-main/catalog-main';
import ProductCardPage from '../../pages/product-page/product-page';
import ErrorPage from '../../pages/error-page/error-page';
import ShoppingCart from '../../pages/shopping-cart/shopping-cart';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../utils/const';
import { useEffect } from 'react';

function App(): JSX.Element {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<CatalogMain />} />
        <Route path={AppRoute.Catalog} element={<CatalogMain />} />
        <Route path={AppRoute.Product} element={<ProductCardPage />} />
        <Route path={AppRoute.ShopCart} element={<ShoppingCart />} />
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
