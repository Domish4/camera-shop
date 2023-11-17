import { CategoryProduct, LevelProduct, ProductType, Status } from '../../utils/const';
import { makeFakeCameras } from '../../utils/mocks';
import { getCatalogAction } from '../api-actions';
import { catalogSlice, changeCategory, changeLevel, changeType, initialState, resetFilters, setMaxPrice, setMinPrice } from './catalog.slice';


describe('Reducer: catalogSlice', () => {

  it('without additional parameters should return initial state', () => {
    expect(catalogSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return array object', () => {
    const catalog = makeFakeCameras();
    expect(catalogSlice.reducer(initialState, {
      type: getCatalogAction.fulfilled.type,
      payload: catalog
    }))
      .toEqual({
        ...initialState,
        catalog,
        maxPrice: 0,
        minPrice: 0,
        sortOrder: null,
        sortType: null,
        category: null,
        types: [],
        levels: [],
        currentPage: null,
        status: Status.Success
      });
  });


  it('should return status loading when fetch is pending', () => {
    expect(catalogSlice.reducer(initialState, {
      type: getCatalogAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(catalogSlice.reducer(initialState, {
      type: getCatalogAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

  it('Should return initial state without additional parameters', () => {
    expect(catalogSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(
        initialState
      );
  });

  it('Should change current category by a given category', () => {
    expect(catalogSlice.reducer(initialState, changeCategory(CategoryProduct.Photocamera)))
      .toEqual({
        ...initialState,
        category: CategoryProduct.Photocamera
      });
  });

  it('Should change current types by a given type', () => {
    expect(catalogSlice.reducer(initialState, changeType(ProductType.Digital)))
      .toEqual({
        ...initialState,
        types: [ProductType.Digital]
      });
  });

  it('Should change current levels by a given level', () => {
    expect(catalogSlice.reducer(initialState, changeLevel(LevelProduct.Amateur)))
      .toEqual({
        ...initialState,
        levels: [LevelProduct.Amateur]
      });
  });

  it('Should set min price', () => {
    expect(catalogSlice.reducer(initialState, setMinPrice(100)))
      .toEqual({
        ...initialState,
        minPrice: 100
      });
  });

  it('Should set max price', () => {
    expect(catalogSlice.reducer(initialState, setMaxPrice(100)))
      .toEqual({
        ...initialState,
        maxPrice: 100
      });
  });

  it('Should reset all filters', () => {
    expect(catalogSlice.reducer(initialState, resetFilters()))
      .toEqual(initialState);
  });
});


