import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Character } from "./Character.type";
import { allCharsWithoutPaging, fetchAllChars, fetchCharacterByUrl, fetchSearchCharacters } from "./characterAPI";

export interface CharacterState extends Character {
  name: string;
  status: 'idle' | 'loading' | 'failed';
  characters: any[];
  character: Character | null;
  totalCount: number;
}

const initialState: CharacterState = {
  totalCount: 0,
  name: '',
  homeworld: '',
  eye_color: '',
  url: '',
  gender: '',
  films: [],
  height: 0,
  skin_color: '',
  birth_year: '',
  hair_color: '',
  vehicles: [],
  starships: [],
  status: 'idle',
  characters: [],
  character: null 
};

export const loadCharacters = createAsyncThunk(
  'character/fetchCharacter',
  async (pageNumber: number) => {
    const response = await fetchAllChars(pageNumber);
    return response;
  }
)

export const searchCharacters = createAsyncThunk(
  'character/searchCharacter',
  async (namePattern: string) => {
    const response = await fetchSearchCharacters(namePattern);
    return response;
  }
)

export const characterByURL = createAsyncThunk(
  'character/characterByURL',
  async (url: string) => {
    const response = await fetchCharacterByUrl(url);
    return response;
  }
)

export const allChars = createAsyncThunk(
  'character/allChars',
  async (urls: string[]) => {
    return await allCharsWithoutPaging(urls);
  }
)


// slice
export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.status = 'idle';
        state.totalCount = action.payload.count;
        state.characters = action.payload.results;
      })
      .addCase(loadCharacters.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(searchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.status = 'idle';
        state.totalCount = action.payload.count;
        state.characters = action.payload.results;
      })
      .addCase(characterByURL.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(characterByURL.fulfilled, (state, action) => {
        state.status = 'idle';
        state.character = action.payload;
      })
      .addCase(allChars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(allChars.fulfilled, (state, action) => {
        state.characters = action.payload;
        state.status = 'idle'
      })
  }
});

export const selectCharacters = (state: RootState) => state.characters;
export default characterSlice.reducer;