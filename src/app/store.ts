import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import characterReducer from 'features/characters/characterSlice';
import planetReducer from 'features/planet/planetSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: characterReducer,
    planet: planetReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
