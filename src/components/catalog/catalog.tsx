import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/catalog.selectors';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import ProductCard from '../product-card/product-card';

function Catalog(): JSX.Element {
  const cameras = useAppSelector(getCameras);


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
              { cameras.map((camera) =>
                <ProductCard key={camera.id} camera={camera} />
              ) }
            </div>
            <div className="pagination">
              <ul className="pagination__list">
                <li className="pagination__item"><a className="pagination__link pagination__link--active" href="1">1</a>
                </li>
                <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                </li>
                <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                </li>
                <li className="pagination__item"><a className="pagination__link pagination__link--text" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
