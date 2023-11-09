import { useEffect, useState } from 'react';
import { Product } from '../../types/product-camera-type';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export type ProductTabsProps = {
  camera: Product;
}

function ProductTabs({ camera }: ProductTabsProps): JSX.Element {
  const [characteristicOpened, setCharacteristicOpen] = useState(false);
  const [descriptionOpened, setDescriptionOpen] = useState(false);
  const locationURL = useLocation();
  const navigate = useNavigate();

  const { vendorCode, type, level, description, category } = camera;

  useEffect(() => {
    const searchParams = new URLSearchParams(locationURL.search);
    const tab = searchParams.get('tab');

    if (tab === 'characteristic') {
      setCharacteristicOpen(true);
      setDescriptionOpen(false);
    } else {
      setDescriptionOpen(true);
      setCharacteristicOpen(false);
    }

    //дефолтное состояние
    if (!tab) {
      navigate({ search: '?tab=description' });
    }
  }, [locationURL.search, navigate]);

  const onCharacteristicButton = () => {
    setCharacteristicOpen(true);
    setDescriptionOpen(false);
    navigate('?tab=characteristic');
  };

  const onDescriptionButton = () => {
    setDescriptionOpen(true);
    setCharacteristicOpen(false);
    navigate('?tab=description');
  };

  return (
    <div className="tabs product__tabs" data-testid="product-tabs">
      <div className="tabs__controls product__tabs-controls">
        <Link
          to="?tab=characteristic"
          className={clsx('tabs__control', characteristicOpened && 'is-active')}
          onClick={onCharacteristicButton}
          type="button"
        >
          Характеристики
        </Link>
        <Link
          to="?tab=description"
          className={clsx('tabs__control', descriptionOpened && 'is-active')}
          onClick={onDescriptionButton}
          type="button"
        >
          Описание
        </Link>
      </div>

      <div className="tabs__content">
        {characteristicOpened && (
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
        )}
        {descriptionOpened && (
          <div className={clsx('tabs__element', descriptionOpened && 'is-active')}>
            <div className="product__tabs-text">
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTabs;
