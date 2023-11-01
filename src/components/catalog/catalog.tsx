import { useAppSelector } from '../../hooks';
import { getCameras, getRenderedProducts } from '../../store/catalog/catalog.selectors';
import { MAX_CAMERAS_CARD } from '../../utils/const';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import { useLocation } from 'react-router-dom';

function Catalog(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const sortedProducts = useAppSelector(getRenderedProducts);
  const pageCount = Math.ceil(cameras.length / MAX_CAMERAS_CARD);

  const renderedCameras = sortedProducts.slice((currentPage - 1) * MAX_CAMERAS_CARD, currentPage * MAX_CAMERAS_CARD);


  return (
    <section className="catalog" data-testid='catalog-test'>
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>
          <div className="catalog__content">
            <CatalogSort />
            <div className="cards catalog__cards">
              { renderedCameras.map((camera) =>
                <ProductCard className='product-card' key={camera.id} camera={camera} />
              ) }
            </div>
            {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
