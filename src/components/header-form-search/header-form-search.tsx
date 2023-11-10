import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/catalog.selectors';
import classNames from 'classnames';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppRoute, KeyCode } from '../../utils/const';
import useKeyPress from '../../hooks/use-key';
import { useOutsideClick } from '../../hooks/use-click-outside';
import SearchItem from './search-item';
import ReactFocusLock from 'react-focus-lock';

function HeaderFormSearch(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchValid, setIsSearchValid] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const cameras = useAppSelector(getCameras);
  const listRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const searchedCameras =
  cameras.filter((camera) =>
    camera.name.toLowerCase().includes(searchValue.toLowerCase()));

  const upArrow = useKeyPress({ targetKey: KeyCode.ArrowUp });
  const downArrow = useKeyPress({ targetKey: KeyCode.ArrowDown });
  const esc = useKeyPress({targetKey: KeyCode.Esc});

  const isUpArrowPressed = searchValue && searchedCameras.length && upArrow;
  const isDownArrowPressed = searchValue && searchedCameras.length && downArrow;
  const isEscPressed = searchValue && searchedCameras.length && esc;

  useOutsideClick(listRef, () => setSearchValue(''));

  useEffect(() => {
    if (searchedCameras.length && isUpArrowPressed) {
      setSelectedIndex((prev) => (prev ? prev - 1 : prev));

      if (!selectedIndex) {
        inputRef.current?.focus();
        setSelectedIndex(-1);
      }

    } else if (searchedCameras.length && isDownArrowPressed) {
      setSelectedIndex((prev) => (prev < searchedCameras.length - 1 ? prev + 1 : prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpArrowPressed, isDownArrowPressed, searchedCameras.length]);


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

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === KeyCode.ArrowUp || evt.key === KeyCode.ArrowDown) {
      evt.preventDefault(); // Prevent scroll on arrow key press
    }
  };

  useEffect(()=> {
    if (searchedCameras.length && isEscPressed) {
      handleResetSearch();
    }

  },[isEscPressed, searchedCameras.length]);

  return (
    <div
      className={classNames('form-search', searchedCameras.length && searchValue && 'list-opened')}
      ref={listRef}
      tabIndex={-1}
      data-testid="search-form"
      onKeyDown={handleKeyDown}

    >
      <ReactFocusLock disabled={!searchValue}>
        <form onSubmit={(evt) => {
          evt.preventDefault();
        }}
        >
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
              ref={inputRef}
            />
          </label>
          <ul className={classNames('form-search__select-list', isSearchValid && 'scroller')}>
            {searchedCameras.map((camera, i) => {
              const isCurrent = i === selectedIndex;

              return (
                <SearchItem
                  camera={camera}
                  isCurrent={isCurrent}
                  key={camera.id}
                  onClick={onSearchItemClick}
                />
              );
            }
            )}
          </ul>
        </form>
        <button
          className="form-search__reset"
          type="reset"
          onClick={handleResetSearch}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>
      </ReactFocusLock>
    </div>
  );
}

export default HeaderFormSearch;

