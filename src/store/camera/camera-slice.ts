import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';
import { getCameraAction } from '../api-actions';


export type CameraSlice = {
  camera: Product | null;
  status: Status;
};

export const initialState: CameraSlice = {
  camera: null,
  status: Status.Idle
};

export const cameraSlice = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCameraAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.status = Status.Success;
      })
      .addCase(getCameraAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
