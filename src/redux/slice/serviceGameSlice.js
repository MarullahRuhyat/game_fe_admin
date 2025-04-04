import { createSlice } from "@reduxjs/toolkit";

export const serviceGameSlice = createSlice({
  name: "serviceGame",
  initialState: {
    serviceGame: [],
    isFetchServiceGame: false,
    error: null,
  },
  reducers: {
    resetServiceGame: (state) => {
      state.serviceGame = [];
      state.isFetchServiceGame = false;
    },
    setServiceGame: (state, action) => {
      state.serviceGame = action.payload;
      state.isFetchServiceGame = true;
    },
    addServiceGame: (state, action) => {
      const data = action.payload;
      let serviceGame = JSON.parse(JSON.stringify(state.serviceGame));
      serviceGame.push(data);
      state.serviceGame = serviceGame;
    },
    updateServiceGame: (state, action) => {
      const data = action.payload;
      let serviceGame = JSON.parse(JSON.stringify(state.serviceGame));
      const index = serviceGame.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        serviceGame[index] = data;
        state.serviceGame = serviceGame;
      }
    },
    removeServiceGame: (state, action) => {
      const id = action.payload;
      let serviceGame = JSON.parse(JSON.stringify(state.serviceGame));
      const updateData = serviceGame.filter((item) => item.id !== id);
      state.serviceGame = updateData;
    },
  },
});

// Ekspor action
export const {
  setServiceGame,
  addServiceGame,
  updateServiceGame,
  removeServiceGame,
  resetServiceGame,
} = serviceGameSlice.actions;

// Ekspor reducer
export default serviceGameSlice.reducer;
