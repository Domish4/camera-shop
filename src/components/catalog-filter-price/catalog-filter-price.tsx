import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCurrentMaxPrice, getCurrentMinPrice, getfilteredCameras } from '../../store/catalog/catalog.selectors';
import { setMaxPrice, setMinPrice } from '../../store/catalog/catalog.slice';
import { getPriceProduct } from '../../utils/catalog-utils';
import {useState, useEffect, ChangeEvent, KeyboardEvent,} from 'react';
import { KeyCode } from '../../utils/const';


export type FilterProps = {
  isReset: boolean;
}

function FilterByPrice({isReset}: FilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getfilteredCameras);
  const allCameras = useAppSelector(getCameras);
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);


  const minPrice = getPriceProduct(cameras, 'min');
  const maxPrice = getPriceProduct(cameras, 'max');

  const minPriceAll = getPriceProduct(allCameras, 'min');
  const maxPriceAll = getPriceProduct(allCameras, 'max');


  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);


  useEffect(() => {
    if (isReset) {
      setMinPriceValue(0);
      setMaxPriceValue(0);
    }
  }, [isReset]);

  const handleMinPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;
    if(evt.target.value === '') {
      setMinPriceValue(+minPriceAll);
      dispatch(setMinPrice(0));

    }
    setMinPriceValue(+price);
  };

  const handleMaxPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = +evt.target.value < 0 || evt.target.value === '-0' ? '' : evt.target.value;

    if(evt.target.value === '') {
      setMaxPriceValue(+maxPriceAll);
      dispatch(setMaxPrice(0));
    }
    setMaxPriceValue(+price);
  };

  const checkMinPrice = () => {
    if (!minPriceValue) {
      setMinPriceValue(0);
      dispatch(setMinPrice(0));

      return;
    }

    if (minPriceValue < +minPrice && cameras.length < allCameras.length) {
      return;
    }

    if (minPriceValue < +minPrice) {
      setMinPriceValue(+minPrice);
      dispatch(setMinPrice(+minPrice));

      return;
    }

    if (minPriceValue > +maxPrice) {
      setMinPriceValue(+maxPrice);
      dispatch(setMinPrice(+maxPrice));

      return;
    }

    dispatch(setMinPrice(minPriceValue));
  };

  const checkMaxPrice = () => {

    if (!maxPriceValue) {
      setMaxPriceValue(0);
      dispatch(setMaxPrice(0));

      return;
    }


    if (maxPriceValue > +maxPrice && cameras.length < allCameras.length) {
      return;
    }

    if (maxPriceValue > +maxPrice) {
      setMaxPriceValue(+maxPrice);
      dispatch(setMaxPrice(+maxPrice));

      return;
    }

    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));

      return;
    }

    dispatch(setMaxPrice(maxPriceValue));
  };

  const handleMinPriceBlur = () => {
    checkMinPrice();
  };

  const handleMaxPriceBlur = () => {
    checkMaxPrice();
  };

  const handleMinPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyCode.Enter) {
      checkMinPrice();
    }
  };

  const handleMaxPriceKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === KeyCode.Enter) {
      checkMaxPrice();
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={minPrice}
              onChange={handleMinPriceInputChange}
              onKeyDown={handleMinPriceKeyDown}
              onBlur={handleMinPriceBlur}
              value={minPriceValue || ''}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={maxPrice}
              onChange={handleMaxPriceInputChange}
              onKeyDown={handleMaxPriceKeyDown}
              onBlur={handleMaxPriceBlur}
              value={maxPriceValue || ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
