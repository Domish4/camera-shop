import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CatalogMain from '../../pages/catalog-main/catalog-main';
import ProductCardPage from '../../pages/product-card-page/product-card-page';
import ErrorPage from '../../pages/error-page/error-page';
import ShoppingCart from '../../pages/shopping-cart/shopping-cart';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path='/' element={<CatalogMain />} />
        <Route path='/products-card' element={<ProductCardPage />} />
        <Route path='/shopping-card' element={<ShoppingCart />} />
        <Route path='/*' element={<ErrorPage />}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
