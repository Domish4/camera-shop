import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

export type BreadcrumbsProps = {
name?: string;
}


function Breadcrumbs({name}: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={AppRoute.Main} className='breadcrumbs__link'>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link to={AppRoute.Catalog} className={`breadcrumbs__link ${name ? '' : 'breadcrumbs__link--active'}`}>Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          {name &&
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
                </li>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
