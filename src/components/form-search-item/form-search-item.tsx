import React, { useEffect, useRef } from 'react';
import { Product } from '../../types/product-camera-type';

type SearchItemProps = {
  camera: Product;
  isCurrent: boolean;
  onClick: (cameraId: number) => void;
};

function FormSearchItem({ camera, isCurrent, onClick }: SearchItemProps): JSX.Element {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isCurrent) {
      itemRef.current?.focus();
    }
  }, [isCurrent]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      onClick(camera.id);
    }
  };

  return (
    <li
      className='form-search__select-item'
      tabIndex={isCurrent ? -1 : 0}
      key={camera.id}
      ref={itemRef}
      onClick={() => onClick(camera.id)}
      onKeyDown={handleKeyDown}
      data-testid="search-item"
    >
      {camera.name}
    </li>
  );
}

export default FormSearchItem;
