import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSelectedSortOrder, getSelectedSortType } from '../../store/catalog/catalog.selectors';
import { selectSortOrder, selectSortType, setCurrentPage } from '../../store/catalog/catalog.slice';
import { SortOrder, SortType, sortOrderQueryValue } from '../../utils/const';
import { useState } from 'react';

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();

  const [isSortTypeSelected, setIsSortTypeSelected] = useState(false);
  const [isSortOrderSelected, setIsSortOrderSelected] = useState(false);
  const currentSortType = useAppSelector(getSelectedSortType);
  const currentSortOrder = useAppSelector(getSelectedSortOrder);

  const handleClickOnSortType = (text: SortType) => {
    if (!isSortOrderSelected) {
      dispatch(selectSortOrder(SortOrder.UP));
      setIsSortOrderSelected(true);
    }
    dispatch(selectSortType(text));
    dispatch(setCurrentPage(1));
    setIsSortTypeSelected(true);

  };

  const handleClickOnSortOrder = (text: SortOrder) => {
    if (!isSortTypeSelected) {
      dispatch(selectSortType(SortType.Price));
      setIsSortTypeSelected(true);
    }

    dispatch(selectSortOrder(text));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="catalog-sort" data-testid='catalog-sort'>
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type" data-testid="sort-by-type">
            {Object.entries(SortType).map(([type, text]) => (
              <Link
                className="catalog-sort__btn-text"
                key={type}
                onClick={() => handleClickOnSortType(text)}
                to={`?sortBy=${text}`}
              >
                <input
                  type="radio"
                  id={type}
                  name="sort"
                  checked={text === currentSortType}
                  readOnly
                />
                <label htmlFor={type}>{text}</label>
              </Link>
            ))}
          </div>
          <div className="catalog-sort__order" data-testid="sort-by-order">
            {Object.entries(SortOrder).map(([type, text]) => (
              <Link
                className={`catalog-sort__btn catalog-sort__btn--${type.toLowerCase()}`}
                key={type}
                onClick={() => handleClickOnSortOrder(text)}
                to={`?order=${sortOrderQueryValue[text]}`}
              >
                <input
                  type="radio"
                  id={type}
                  name="sort-icon"
                  aria-label={text}
                  checked={text === currentSortOrder}
                  readOnly
                />
                <label htmlFor={type}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-sort"></use>
                  </svg>
                </label>
              </Link>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
