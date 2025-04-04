import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    games: [],
    isFetchGame: false,
  },
  reducers: {
    setGame(state, action) {
      state.games = action.payload;
      state.isFetchGame = true;
    },
    addGame(state, action) {
      state.games.push(action.payload);
    },
    updateGame(state, action) {
      const updatedGame = action.payload;
      const index = state.games.findIndex((g) => g.id === updatedGame.id);
      if (index !== -1) {
        state.games[index] = updatedGame;
      }
    },
    removeGame(state, action) {
      const id = action.payload;
      state.games = state.games.filter((g) => g.id !== id);
    },
    resetFetchGame(state) {
      state.isFetchGame = false;
    },
  },
});

export const { setGame, addGame, updateGame, removeGame, resetFetchGame } =
  gameSlice.actions;

export default gameSlice.reducer;
