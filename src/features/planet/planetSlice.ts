import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Planet } from "./Planet.type";
import { fetchPlanetByUrl } from "./planetAPI";

export interface PlanetInterface {
  name: string;
  planet: Planet | null;
  status: 'loading' | 'idle' | 'failed';
  modalOpen: boolean;
}

const initialState: PlanetInterface = {
  name: '',
  status: 'idle',
  planet: null,
  modalOpen: false,
}

export const loadPlanet = createAsyncThunk(
  'planet/loadPlanet',
  async (url: string) => {
    const response = await fetchPlanetByUrl(url);
    return response;
  }
);

// slice 
const planetSlice = createSlice({
  name: 'planet',
  initialState, 
  reducers: {
    toggleModal(state) {
      state.modalOpen = !state.modalOpen
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlanet.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadPlanet.fulfilled, (state, action) => {
        state.status = 'idle'
        state.planet = action.payload
      })
  }
})

export const {toggleModal} = planetSlice.actions
export const selectPlanet = (state: RootState) => state.planet;
export default planetSlice.reducer;