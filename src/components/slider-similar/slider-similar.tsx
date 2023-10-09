import { Product } from '../../types/product-camera-type';
import ProductCard from '../product-card/product-card';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';

export type SimilarProps = {
    similarCameras: Product[];
  }

function SliderSimilar({similarCameras}: SimilarProps): JSX.Element {
  return (
    <>
     
    </>


  );
}

export default SliderSimilar;
