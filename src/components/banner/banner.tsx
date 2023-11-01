import { Link, generatePath } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/promo/promo.selectors';
import { AppRoute } from '../../utils/const';
import { Swiper, SwiperSlide } from 'swiper/react';
import './banner.css';
import { Pagination, Autoplay } from 'swiper/modules';


function Banner(): JSX.Element {
  const promos = useAppSelector(getPromo);

  if (!promos) {
    return (<div></div>);
  }
  return (
    <Swiper modules={[Pagination, Autoplay]} spaceBetween={50} slidesPerView={1} autoplay={{delay: 3000}} pagination={{ clickable: true}}>
      {promos.map((slideContent, index) => (
        <SwiperSlide key={slideContent.id} virtualIndex={index}>
          <div className="banner" data-testid='banner-test'>
            <picture>
              <source type="image/webp" srcSet={`/${slideContent.previewImgWebp}, /${slideContent.previewImgWebp2x} 2x`} />
              <img src={`/${slideContent.previewImg}`} srcSet={`/${slideContent.previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{slideContent.name}</span>
              <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
              <Link to={generatePath(AppRoute.Product, { id: slideContent.id.toString() })} className="btn">Подробнее</Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>


  );
}

export default Banner;
