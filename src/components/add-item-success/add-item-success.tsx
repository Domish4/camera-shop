import { Link, useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import { AppRoute } from '../../utils/const';

export type AddItemProps = {
onCloseModal: () => void;
isModalOpened: boolean;
}


function AddItemSuccess({onCloseModal, isModalOpened}: AddItemProps): JSX.Element {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(AppRoute.Main);
    onCloseModal();
  };

  return (
    <Modal isModalOpened={isModalOpened} onCloseClick={onCloseModal} >
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <button onClick={handleClick} className="btn btn--transparent modal__btn">Продолжить покупки</button>
              <Link to={AppRoute.ShopCart} className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</Link>
            </div>
            <button onClick={() => onCloseModal()} className="cross-btn" type="button" aria-label="Закрыть попап">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddItemSuccess;

