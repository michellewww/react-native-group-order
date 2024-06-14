// Features/Location/LocationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: null,
  longitude: null,
  locationName: 'Atlanta, GA',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.locationName = action.payload.locationName;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;

