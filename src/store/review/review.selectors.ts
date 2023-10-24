import { Review } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';


export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getStatus = (state: State): Status => state[NameSpace.Reviews].status;
