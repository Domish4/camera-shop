import dayjs from 'dayjs';
import { Review } from '../types/product-camera-type';

export const getSortedReviews = (reviews: Review[]): Review[] =>[...reviews].sort((a, b) => dayjs(b.createAt).diff(a.createAt));
