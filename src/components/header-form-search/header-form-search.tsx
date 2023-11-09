import { useState, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/catalog.selectors';
import classNames from 'classnames';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

function HeaderFormSearch(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchValid, setIsSearchValid] = useState(false);
  const cameras = useAppSelector(getCameras);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const searchedCameras =
  cameras.filter((camera) =>
    camera.name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
    setIsSearchValid(searchValue.length >= 2);
  };

  const onSearchItemClick = (cameraId: number) => {
    navigate(generatePath(AppRoute.Product, {id: String(cameraId)}));
    setSearchValue('');
  };

  const handleResetSearch = () => {
    setSearchValue('');
    setIsSearchValid(false);
  };

  return (
    <div
      className={classNames('form-search', searchedCameras.length && searchValue && 'list-opened')}
      ref={listRef}
      tabIndex={-1}
      data-testid="search-form"
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchValue}
            onChange={handleChange}
          />
        </label>
        {searchedCameras.length > 0 && isSearchValid && (
          <ul className="form-search__select-list">
            {searchedCameras.map((result) => (
              <li
                key={result.id}
                className="form-search__select-item"
                tabIndex={0}
                onClick={() => onSearchItemClick(result.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onSearchItemClick(result.id);
                  }
                }}
              >
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </form>
      <button className="form-search__reset" type="reset" onClick={handleResetSearch}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default HeaderFormSearch;
