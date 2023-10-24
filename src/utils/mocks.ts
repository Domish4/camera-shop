import {datatype, random, image, lorem, name, date} from 'faker';
import { Product, PromoProduct, Review } from '../types/product-camera-type';


const MOCK_DEFAULT_NUMBER = 1;
const CAMERAS_AMOUNT = 15;
const REVIEWS_AMOUNT = 10;


export const makeFakeCamera = (id = MOCK_DEFAULT_NUMBER):Product=>({
  id,
  name: random.words(2),
  vendorCode: random.alpha({count: 10}),
  type: lorem.word(),
  category: random.word(),
  description: lorem.sentences(),
  level: random.word(),
  price: datatype.number({min: 0, max: 150000, precision: 1}),
  reviewCount: datatype.number({min: 0, max: 100, precision: 1}),
  previewImg: image.technics(),
  previewImg2x: image.abstract(),
  previewImgWebp: image.animals(),
  previewImgWebp2x: image.city(),
} as Product);

export const makeFakeCameras = (amount = CAMERAS_AMOUNT):Product[]=> Array.from({length:amount},(_, i)=> makeFakeCamera(i + 1));

export const makeFakeReview = (): Review => ({
  id: random.alpha({count: 36}),
  createAt: date.recent().toISOString(),
  cameraId: datatype.number({min: 1, max: 15}),
  userName: name.firstName(),
  advantage: lorem.sentences(1),
  disadvantage: lorem.sentences(1),
  review: lorem.sentences(2),
  rating: datatype.number({min: 1, max: 5})
} as Review);

export const makeFakeReviews = (amount = REVIEWS_AMOUNT):Review[]=> Array.from({length:amount},()=> makeFakeReview());


export const makeFakeAddReview = (): Review => ({
  cameraId: datatype.number({min: 1, max: 15}),
  userName: name.firstName(),
  advantage: lorem.sentences(1),
  disadvantage: lorem.sentences(1),
  review: lorem.sentences(2),
  rating: datatype.number({min: 1, max: 5})
} as Review);

export const makeFakePromo = () : PromoProduct => ({
  id: datatype.number({min: 1, max: 15}),
  name: random.words(2),
  previewImg: image.technics(),
  previewImg2x: image.abstract(),
  previewImgWebp: image.animals(),
  previewImgWebp2x: image.city()
} as PromoProduct);
