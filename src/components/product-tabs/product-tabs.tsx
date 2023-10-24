import { useEffect, useState } from 'react';
import { Product } from '../../types/product-camera-type';
import { Link, useLocation} from 'react-router-dom';
import clsx from 'clsx';

export type ProductTabsProps = {
camera: Product;
}

function ProductTabs({camera}: ProductTabsProps): JSX.Element {
  const [characteristicOpened, setCharacteristicOpen] = useState(false);
  const [descriptionOpened, setDescriptionOpen] = useState(false);
  const locationURL = useLocation();

  const {vendorCode, type, level, description, category} = camera;

  useEffect(() => {
    if (locationURL.search === '?tab=characteristic') {
      setCharacteristicOpen(true);
      setDescriptionOpen(false);

    } else {
      setDescriptionOpen(true);
      setCharacteristicOpen(false);
    }
  }, [locationURL.search]);

  const onCharacteristicButton = () => {
    setCharacteristicOpen(true);
    setDescriptionOpen(false);

  };

  const onDescriptionButton = () => {
    setDescriptionOpen(true);
    setCharacteristicOpen(false);

  };

  return (
    <div className="tabs product__tabs" data-testid='product-tabs'>
      <div className="tabs__controls product__tabs-controls">
        <Link to={'?tab=characteristic'} className={clsx('tabs__control', characteristicOpened && 'is-active')} onClick={() => onCharacteristicButton()} type="button">Характеристики</Link>
        <Link to={'?tab=description'} className={clsx('tabs__control', descriptionOpened && 'is-active')} onClick={() => onDescriptionButton()} type="button">Описание</Link>
      </div>

      <div className="tabs__content">
        {
          characteristicOpened ?
            <div className={clsx('tabs__element', characteristicOpened && 'is-active')}>
              <ul className="product__tabs-list">
                <li className="item-list">
                  <span className="item-list__title">Артикул:</span>
                  <p className="item-list__text"> {vendorCode}</p>
                </li>
                <li className="item-list">
                  <span className="item-list__title">Категория:</span>
                  <p className="item-list__text">{category}</p>
                </li>
                <li className="item-list">
                  <span className="item-list__title">Тип камеры:</span>
                  <p className="item-list__text">{type}</p>
                </li>
                <li className="item-list">
                  <span className="item-list__title">Уровень:</span>
                  <p className="item-list__text">{level}</p>
                </li>
              </ul>
            </div>
            : ''
        }
        {
          descriptionOpened ?
            <div className={clsx('tabs__element', descriptionOpened && 'is-active')}>
              <div className="product__tabs-text">
                <p>{description}</p>
              </div>

            </div>
            : ''
        }
      </div>
    </div>
  );
}

export default ProductTabs;
