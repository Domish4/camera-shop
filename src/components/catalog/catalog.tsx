import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/catalog.selectors';
import { MAX_CAMERAS_CARD } from '../../utils/const';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import { useParams } from 'react-router-dom';
import Loader from '../loader/loader';

function Catalog(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const param = useParams().page;
  const currentPage = Number(param?.replace(/[^\d]/g, ''));
  const pageCount = Math.ceil(cameras.length / MAX_CAMERAS_CARD);
  const renderedCameras = cameras.slice((currentPage - 1) * MAX_CAMERAS_CARD, currentPage * MAX_CAMERAS_CARD);

  if (!cameras || !renderedCameras) {
    return (
      <Loader />
    );
  }

  return (
    <section className="catalog">
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
                <ProductCard key={camera.id} camera={camera} />
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
