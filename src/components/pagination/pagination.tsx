import clsx from 'clsx';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../utils/const';


type PaginationProps = {
  currentPage: number;
  pageCount: number;
}

function Pagination({currentPage, pageCount, }: PaginationProps): JSX.Element {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={generatePath(AppRoute.Catalog, { page: `page_${currentPage - 1}` })}>Назад</Link>
          </li>}
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <li className="pagination__item" key={page}>
            <Link
              className={clsx('pagination__link', page === currentPage && 'pagination__link--active')}
              to={generatePath(AppRoute.Catalog, { page: `page_${page}` })}

            >
              {page}
            </Link>
          </li>
        ))}
        {currentPage !== pageCount &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to={generatePath(AppRoute.Catalog, { page: `page_${currentPage + 1}` })}>Далее</Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
