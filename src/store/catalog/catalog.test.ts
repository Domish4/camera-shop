import { Status } from '../../utils/const';
import { makeFakeCameras } from '../../utils/mocks';
import { getCatalogAction } from '../api-actions';
import { catalogSlice, initialState } from './catalog.slice';


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

});
