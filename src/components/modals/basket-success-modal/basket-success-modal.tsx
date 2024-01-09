import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getOrderStatus } from '../../../store/shopping-cart/shopping-cart-selectors';
import { resetBasket, resetOrderStatus } from '../../../store/shopping-cart/shopping-cart-slice';
import Modal from '../modal/modal';
import { AppRoute } from '../../../utils/const';


function ModalProductBasketSuccess(): JSX.Element {
  const orderStatus = useAppSelector(getOrderStatus);
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(resetOrderStatus());
    dispatch(resetBasket());
  };
  return (
    <Modal isModalOpened={orderStatus.isSuccess} onCloseClick={handleCloseClick}>
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link
          to={AppRoute.Main}
          onClick={handleCloseClick}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </Link>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </Modal>

  );
}

export default ModalProductBasketSuccess;
