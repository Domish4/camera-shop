import dayjs from 'dayjs';
import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/review/review.selectors';
import ReviewCard from '../review-card/review-card';
import { useState, useCallback } from 'react';
import ModalReview from '../modal-review/modal-review';
import ModalReviewSuccess from '../modal-review-success/modal-review-success';


function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const MAX_REVIEWS_COUNT = 3;
  const [reviewsCount, setReviewsCount] = useState(MAX_REVIEWS_COUNT);
  const sortedReviews = [...reviews].sort((a, b) => dayjs(b.createAt).diff(a.createAt));

  const [isModalOpened, setModalOpened] = useState(false);


  const handleReviewModalShow = useCallback((() => {
    setModalOpened(true);
  }),[]);

  const handleReviewModalHide = useCallback(() => {
    setModalOpened(false);
  },[setModalOpened]);

  return (
    <>
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={() => handleReviewModalShow()}>Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {sortedReviews.slice(0, reviewsCount).map((review) => <ReviewCard reviewCard={review} key={review.id} />
            )}
          </ul>
          <div className="review-block__buttons">
            {sortedReviews.length > reviewsCount &&
            <button
              onClick={() => setReviewsCount((count) => count + MAX_REVIEWS_COUNT)}
              className="btn btn--purple"
              type="button"
            >
              Показать больше отзывов
            </button>}
          </div>
        </div>
      </section>
      <ModalReview isModalOpened={isModalOpened} onCloseModal={handleReviewModalHide} />
      <ModalReviewSuccess />
    </>
  );
}

export default ReviewBlock;

