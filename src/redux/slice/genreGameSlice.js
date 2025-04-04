// redux/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const genreGameSlice = createSlice({
  name: "smartReplies",
  initialState: {
    genreGame: [],
    isFetchGenreGame: false,
    error: null,
  },
  reducers: {
    resetGenreGame: (state) => {
      state.genreGame = [];
      state.isFetchGenreGame = false;
    },
    setGenreGame: (state, action) => {
      state.genreGame = action.payload;
      state.isFetchGenreGame = true;
    },
    addGenreGame: (state, action) => {
      const data = action.payload;
      let genreGame = JSON.parse(JSON.stringify(state.genreGame));
      genreGame.push(data);
      state.genreGame = genreGame;
    },
    updateGenreGame: (state, action) => {
      const data = action.payload;

      let genreGame = JSON.parse(JSON.stringify(state.genreGame));
      const index = genreGame.findIndex((item) => item.id === data.id);
      genreGame[index] = data;
      state.genreGame = genreGame;
    },
    removeGenreGame: (state, action) => {
      const id = action.payload;
      let genreGame = JSON.parse(JSON.stringify(state.genreGame));
      const updateData = genreGame.filter((item) => item.id !== id);
      state.genreGame = updateData;
    },
  },
});

// Ekspor action
export const {
  setGenreGame,
  addGenreGame,
  updateGenreGame,
  removeGenreGame,
  isFetchGenreGame,
  resetGenreGame,
} = genreGameSlice.actions;
// Ekspor reducer
export default genreGameSlice.reducer;
