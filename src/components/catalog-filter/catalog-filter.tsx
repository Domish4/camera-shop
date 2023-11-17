'use client';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentCategory, getCurrentLevels, getCurrentTypes } from '../../store/catalog/catalog.selectors';
import { changeCategory, changeLevel, changeType, resetFilters } from '../../store/catalog/catalog.slice';
import { CategoryProduct, LevelProduct, ProductType, categoryQueryValue, levelQueryValue, typeQueryValue } from '../../utils/const';
import FilterPrice from '../catalog-filter-price/catalog-filter-price';
import {useState, useEffect} from 'react';

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getCurrentCategory);
  const currentType = useAppSelector(getCurrentTypes);
  const currentLevel = useAppSelector(getCurrentLevels);
  const [isReset, setIsReset] = useState(false);


  const isInstantType = currentType.includes(ProductType.Instant);
  const isFilmType = currentType.includes(ProductType.Film);

  const isVideoCamera = currentCategory === CategoryProduct.Videocamera;


  const handleChangeCategory = (category: CategoryProduct) => {
    if (currentCategory === category) {
      dispatch(changeCategory(null));
      return;
    }
    dispatch(changeCategory(category));
  };

  const handleChangeLevel = (level: LevelProduct) => {
    dispatch(changeLevel(level));
  };

  const handleChangeType = (type: ProductType) => {
    dispatch(changeType(type));
  };

  const handleClickResetFilter = () => {
    setIsReset(true);
    dispatch(resetFilters());
  };

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);

  return (
    <div className="catalog-filter" data-testid='catalog-filter'>
      <form action="#" onSubmit={(evt) => {
        evt.preventDefault();
      }}
      >
        <h2 className="visually-hidden">Фильтр</h2>
        <FilterPrice isReset={isReset}/>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          {Object.values(CategoryProduct).map((category) => (
            <div className="custom-checkbox catalog-filter__item" key={category}>
              <label>
                <input
                  type="checkbox"
                  name={categoryQueryValue[category]}
                  checked={currentCategory === category}
                  onClick={() => handleChangeCategory(category)}
                  disabled={category === CategoryProduct.Videocamera && (isFilmType || isInstantType)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{category}</span>
              </label>
            </div>
          )
          )}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {Object.values(ProductType).map((type) => (
            <div className="custom-checkbox catalog-filter__item" key={type}>
              <label>
                <input
                  type="checkbox"
                  name={typeQueryValue[type]}
                  checked={currentType.includes(type)}
                  onChange={() => handleChangeType(type)}
                  disabled={isVideoCamera && (type === ProductType.Instant || type === ProductType.Film)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{type}</span>
              </label>
            </div>
          )
          )}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {Object.values(LevelProduct).map((level) => (
            <div className="custom-checkbox catalog-filter__item" key={level}>
              <label>
                <input
                  type="checkbox"
                  name={levelQueryValue[level]}
                  checked={currentLevel.includes(level)}
                  onChange={() => handleChangeLevel(level)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{level}</span>
              </label>
            </div>
          )
          )}

        </fieldset>
        <button onClick={handleClickResetFilter} className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilter;
