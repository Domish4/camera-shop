import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postDiscount, postOrder } from '../../store/api-actions';
import { getCoupon, getDiscountPercent, getDiscountStatus, getOrderStatus, getShopCartCameras, selectAllBasketProducts } from '../../store/shopping-cart/shopping-cart-selectors';
import { getDiscount, getFinalPrice, getTotalPrice } from '../../utils/basket-utils';
import classNames from 'classnames';
import {setCoupon } from '../../store/shopping-cart/shopping-cart-slice';
import { Coupon } from '../../utils/const';
import Loader from '../loader/loader';

type PromoFormField = {
  promo: Coupon;
};

function BasketSummary(): JSX.Element {
  const dispatch = useAppDispatch();
  const basketCameras = useAppSelector(selectAllBasketProducts);
  const shopCartCameras = useAppSelector(getShopCartCameras);
  const discountPercent = useAppSelector(getDiscountPercent);
  const currentCoupon = useAppSelector(getCoupon);
  const discountStatus = useAppSelector(getDiscountStatus);
  const orderStatus = useAppSelector(getOrderStatus);
  const totalPrice = getTotalPrice(basketCameras);
  const discount = getDiscount(totalPrice, discountPercent);
  const finalPrice = getFinalPrice(totalPrice, discount);

  const camerasIds = basketCameras.reduce((acc: number[], product) => {
    acc.push(product.id);
    return acc;
  }, []);

  const handleClick = () => {
    if(currentCoupon === 0){
      const emptyCoupon = 0;
      dispatch(postOrder({ camerasIds: camerasIds, coupon: emptyCoupon }));
      return;
    }
    dispatch(postOrder({ camerasIds: camerasIds, coupon: currentCoupon }));
  };

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<PromoFormField>({
    mode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<PromoFormField> = (data) => {
    dispatch(postDiscount(data.promo));
  };

  return (
    <div className="basket__summary" data-testid='basket-summary'>
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form
            action="#"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classNames('custom-input', errors.promo && 'is-invalid', isValid && 'is-valid')}>
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  {...register('promo', {
                    validate: {
                      positive: (value) => {

                        if (value === Coupon.First || value === Coupon.Second || value === Coupon.Third){
                          dispatch(setCoupon(value));
                          return true;
                        } else {
                          return false;
                        }
                      }
                    }
                  })}
                  type="text"
                  name="promo"
                  defaultValue={currentCoupon || ''}
                  placeholder="Введите промокод"
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">
              {discountStatus.isLoading ? <Loader /> : 'Применить'}
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{totalPrice} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={classNames('basket__summary-value', discount && 'basket__summary-value--bonus')}>{discount} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">{finalPrice} ₽</span>
        </p>
        <button disabled={shopCartCameras.length <= 0} className="btn btn--purple" onClick={handleClick}>
          {orderStatus.isLoading ? <Loader /> : 'Оформить заказ'}
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;
