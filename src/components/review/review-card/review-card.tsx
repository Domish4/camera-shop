import { Review } from '../../../types/product-camera-type';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export type ReviewCardProps = {
    reviewCard: Review;
}

function ReviewCard({reviewCard}: ReviewCardProps): JSX.Element {
  const {userName, review, rating, advantage, disadvantage, createAt} = reviewCard;

  return (
    <li className="review-card" data-testid='review-card'>
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>
          {dayjs(createAt, { locale: 'ru' }).format('D MMMM')}
        </time>
      </div>
      <div className="rate review-card__rate">
        {Array(5).fill('').map((_, index) => (
          <svg
            key={`${index.toString()}`}
            width="17"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref={index + 1 <= rating ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
