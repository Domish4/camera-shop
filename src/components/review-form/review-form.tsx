/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppDispatch, useAppSelector } from '../../hooks';
import ErrorPage from '../../pages/error-page/error-page';
import { postReviewAction } from '../../store/api-actions';
import { getCamera } from '../../store/camera/camera.selectors';
import { Review } from '../../types/product-camera-type';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import {useState} from 'react';

export type ReviewFormProps = {
    onCloseModal: () => void;
  }


function ReviewForm({onCloseModal}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getCamera);
  const [rate, setRate] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Review>({
    mode: 'onSubmit'
  });

  if (!product) {
    return <ErrorPage />;
  }

  const onSubmit = (data: Review) => {
    const cameraId = product.id;
    const rating = Number(data.rating);
    dispatch(postReviewAction({...data, onSuccess: onCloseModal, cameraId, rating}));
    reset();
  };
  return (
    <div className="form-review" data-testid='form-review'>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-review__rate">
          <fieldset className="rate form-review__item">
            <legend className="rate__caption">Рейтинг
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </legend>
            <div className="rate__bar">
              <div className="rate__group">
                <input onClick={() => setRate(5)} className="visually-hidden" id="star-5" type="radio" value="5" {...register('rating')}/>
                <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                <input onClick={() => setRate(4)} className="visually-hidden" id="star-4" type="radio" value="4" {...register('rating')}/>
                <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                <input onClick={() => setRate(3)} className="visually-hidden" id="star-3" type="radio" value="3" {...register('rating')}/>
                <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                <input onClick={() => setRate(2)} className="visually-hidden" id="star-2" type="radio" value="2" {...register('rating')}/>
                <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                <input onClick={() => setRate(1)} className="visually-hidden" id="star-1" type="radio" value="1" {...register('rating')}/>
                <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
              </div>
              <div className="rate__progress"><span className="rate__stars">{rate}</span> <span>/</span> <span className="rate__all-stars">5</span>
              </div>
            </div>
            <p className="rate__message">Нужно оценить товар</p>
          </fieldset>
          <div className={clsx('custom-input form-review__item', errors.userName && 'is-invalid')}>
            <label>
              <span className="custom-input__label">Ваше имя
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input type="text" placeholder="Введите ваше имя" {...register('userName', {required: true})}/>
            </label>
            {errors?.userName && <p className="custom-input__error">Нужно указать имя</p>}
          </div>
          <div className={clsx('custom-input form-review__item', errors.advantage && 'is-invalid')}>
            <label>
              <span className="custom-input__label">Достоинства
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input type="text" placeholder="Основные преимущества товара" {...register('advantage', {required: true})}/>
            </label>
            {errors?.advantage && <p className="custom-input__error">Нужно указать достоинства</p> }
          </div>
          <div className={clsx('custom-input form-review__item', errors.disadvantage && 'is-invalid')}>
            <label>
              <span className="custom-input__label">Недостатки
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input type="text" placeholder="Главные недостатки товара" {...register('disadvantage', {required: true})} />
            </label>
            {errors?.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p> }
          </div>
          <div className={clsx('custom-textarea form-review__item', errors.review && 'is-invalid')}>
            <label>
              <span className="custom-textarea__label">Комментарий
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <textarea minLength={2} maxLength={160} placeholder="Поделитесь своим опытом покупки" {...register('review', {required: true})}></textarea>
            </label>
            {errors?.review && <div className="custom-textarea__error">Нужно добавить комментарий</div> }
            {errors.review && errors.review.type === 'maxLength' &&
              <div className="custom-textarea__error">Вы достигли максимального количества символов</div>}
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
      </form>
    </div>
  );
}

export default ReviewForm;
