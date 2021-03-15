import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    query: '',
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = movieSlice.actions;

export const selectQuery = state => state.movie.query;

export default movieSlice.reducer;
