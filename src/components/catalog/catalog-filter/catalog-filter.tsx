import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCurrentCategory, getCurrentLevels, getCurrentTypes } from '../../../store/catalog/catalog.selectors';
import { changeCategory, changeLevel, changeType, resetFilters } from '../../../store/catalog/catalog.slice';
import { CategoryProduct, LevelProduct, ProductType, categoryProductName, categoryQueryValue, levelQueryValue, typeQueryValue } from '../../../utils/const';
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

  const location = useLocation();
  const navigate = useNavigate();

  const searchParam = new URLSearchParams(location.search);
  const paramsCategory = searchParam.get('category');
  const paramsType = searchParam.getAll('types');

  const paramsLevel = searchParam.getAll('levels');

  const updateURL = (params: { category?: string | null; types?: ProductType[]; levels?: LevelProduct[] }) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('category');
    searchParams.delete('types');
    searchParams.delete('levels');

    if (params.category) {
      searchParams.append('category', params.category);
    }
    if (params.types && params.types.length > 0) {
      params.types.forEach((type) => searchParams.append('types', type));
    }
    if (params.levels && params.levels.length > 0) {
      params.levels.forEach((level) => searchParams.append('levels', level));
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  };


  const handleChangeCategory = (category: CategoryProduct) => {
    if (currentCategory === category) {
      dispatch(changeCategory(null));
      dispatch(changeType([])); // Сбросить выбранные типы продуктов при снятии выбора категории
      updateURL({ category: null, types: [] });
      return;
    }
    dispatch(changeCategory(category));
    const updatedType = currentType.filter((type) => !(isVideoCamera && (type === ProductType.Instant || type === ProductType.Film)));
    dispatch(changeType(updatedType));
    updateURL({ category, types: updatedType, levels: currentLevel });
  };
  const handleChangeType = (type: ProductType) => {
    const updatedType = currentType.includes(type)
      ? currentType.filter((item) => item !== type)
      : [...currentType, type];

    dispatch(changeType(updatedType));
    updateURL({ types: updatedType, levels: currentLevel, category: currentCategory });
  };

  const handleChangeLevel = (level: LevelProduct) => {
    const updatedLevel = currentLevel.includes(level)
      ? currentLevel.filter((item) => item !== level)
      : [...currentLevel, level];

    dispatch(changeLevel(updatedLevel));
    updateURL({ types: currentType, levels: updatedLevel, category: currentCategory });
  };

  const handleClickResetFilter = () => {
    setIsReset(true);
    dispatch(resetFilters());
    updateURL({levels: [], types: [], category: null});
  };

  useEffect(() => {
    dispatch(changeCategory(paramsCategory as CategoryProduct));

    dispatch(changeType(paramsType as ProductType[]));

    dispatch(changeLevel(paramsLevel as LevelProduct[]));

  }, [dispatch]);


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
                  checked={paramsCategory === category}
                  onChange={() => handleChangeCategory(category)}
                  disabled={category === CategoryProduct.Videocamera && (isFilmType || isInstantType)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{categoryProductName[category]}</span>
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
                  checked={paramsType.includes(type)}
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
                  checked={paramsLevel.includes(level)}
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
