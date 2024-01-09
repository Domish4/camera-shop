import Modal from '../modal/modal';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { changePostStatus } from '../../../store/review/review-slice';
import { getAddReviewStatus } from '../../../store/review/review.selectors';
import { Status } from '../../../utils/const';


function ModalProductReviewSuccess(): JSX.Element {
  const dispatch = useAppDispatch();
  const postReviewStatus = useAppSelector(getAddReviewStatus);

  const onCloseClick = () => {
    dispatch(changePostStatus());
  };

  return (
    <Modal isModalOpened={postReviewStatus === Status.Success} onCloseClick={onCloseClick}>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={onCloseClick}
        >
        Вернуться к покупкам
        </button>
      </div>
    </Modal>
  );
}

export default ModalProductReviewSuccess;
