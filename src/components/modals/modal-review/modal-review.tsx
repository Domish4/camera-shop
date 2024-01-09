import Modal from '../modal/modal';
import ReviewForm from '../../review/review-form/review-form';

export type ModalReviewProps = {
  onCloseModal: () => void;
  isModalOpened: boolean;
}

function ModalReview({onCloseModal, isModalOpened}: ModalReviewProps): JSX.Element {

  return (
    <Modal isModalOpened={isModalOpened} onCloseClick={onCloseModal}>
      <p className="title title--h4">Оставить отзыв</p>
      <ReviewForm onCloseModal={onCloseModal}/>
    </Modal>
  );
}

export default ModalReview;
