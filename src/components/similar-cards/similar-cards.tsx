import { Product } from '../../types/product-camera-type';
import ProductCard from '../product-card/product-card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './similar-cards.css';

export type SimilarProps = {
  similarCameras: Product[];
}

function SimilarCards({similarCameras}: SimilarProps): JSX.Element {

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <Swiper className="product-similar__slider-list" modules={[Navigation]}
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
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд"
            style={{ pointerEvents: 'auto' }}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд"
            style={{ pointerEvents: 'auto' }}
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

