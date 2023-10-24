import { Status } from '../../utils/const';
import { makeFakeCamera } from '../../utils/mocks';
import { getCameraAction } from '../api-actions';
import { cameraSlice, initialState } from './camera-slice';


describe('Reducer: cameraSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(cameraSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return camera object', () => {
    const camera = makeFakeCamera();
    expect(cameraSlice.reducer(initialState, {
      type: getCameraAction.fulfilled.type,
      payload: camera
    }))
      .toEqual({
        ...initialState,
        camera,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(cameraSlice.reducer(initialState, {
      type: getCameraAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(cameraSlice.reducer(initialState, {
      type: getCameraAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
