import { useEffect, useState } from 'react';
import { Link, generatePath,useNavigate, } from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute } from '../../utils/const';

type PaginationProps = {
  pageCount: number;
  currentPage: number;
};

function Pagination({ pageCount, currentPage }: PaginationProps): JSX.Element {
  const navigate = useNavigate();
  const [, setCurrentPage] = useState(1);


  const getPageNumbers = () => {
    const range = [];
    const minRange = currentPage - 1;
    const maxRange = currentPage + 2;

    for (let i = minRange; i <= maxRange; i++) {
      if (i > 0 && i <= pageCount) {
        range.push(i);
      }
    }

    return range;
  };

  useEffect(() => {
    if (currentPage > pageCount) {
      navigate(generatePath(AppRoute.Catalog, { page: `?page_${currentPage}` }));
    }
  }, [currentPage, pageCount, navigate]);

  return (
    <div className="pagination" data-testid="pagination">
      <ul className="pagination__list">
        {currentPage > 1 && (
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={{ pathname: AppRoute.Catalog, search: `?page=${currentPage - 1}` }}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Назад
            </Link>
          </li>
        )}
        {getPageNumbers().map((page) => (
          <li className="pagination__item" key={page}>
            <Link
              className={clsx('pagination__link', page === currentPage && 'pagination__link--active')}
              to={{ pathname: AppRoute.Catalog, search: `?page=${page}` }}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Link>
          </li>
        ))}
        {pageCount <= 3 || currentPage !== pageCount && (
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={{ pathname: AppRoute.Catalog, search: `?page=${currentPage + 1}` }}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
