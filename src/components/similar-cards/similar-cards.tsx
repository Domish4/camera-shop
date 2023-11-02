import { Product } from '../../types/product-camera-type';
import ProductCard from '../product-card/product-card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import './similar-cards.css';
import { useRef, useState } from 'react';
import classNames from 'classnames';

export type SimilarProps = {
  similarCameras: Product[];
}

function SimilarCards({similarCameras}: SimilarProps): JSX.Element {
  const swiperRef = useRef<SwiperRef['swiper']>();
  const [{ isBeginning, isEnd }, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <Swiper className="product-similar__slider-list" modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setSliderState({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
            }}
            spaceBetween={32}
            slidesPerView={3}
            slidesPerGroup={3}
            navigation={
              {
                nextEl: '.slider-controls--next',
                prevEl: '.slider-controls--prev'
              }
            }
          >
            {
              similarCameras.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <ProductCard className='similar-card' camera={slide} />
                </SwiperSlide>
              ))
            }
          </Swiper>
          <button style={{
            pointerEvents: isBeginning ? 'none' : 'auto',
            zIndex:'10'
          }}
          onClick={() => swiperRef.current?.slidePrev()}
          className={classNames('slider-controls slider-controls--prev', isBeginning && 'disabled')} type="button" aria-label="Предыдущий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button style={{
            pointerEvents: isEnd ? 'none' : 'auto',
            zIndex:'10'
          }}
          onClick={() => swiperRef.current?.slideNext()}
          className={classNames('slider-controls slider-controls--next', isEnd && 'disabled')} type="button" aria-label="Следующий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarCards;

