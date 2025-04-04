import { configureStore } from "@reduxjs/toolkit";
import genreGameSlice from "@/redux/slice/genreGameSlice";
import serviceGameSlice from "@/redux/slice/serviceGameSlice";
import gameSlice from "@/redux/slice/gameSlice";

export const store = configureStore({
  reducer: {
    genreGame: genreGameSlice,
    serviceGame: serviceGameSlice,
    game: gameSlice,
  },
});
