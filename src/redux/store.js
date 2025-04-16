import { configureStore } from "@reduxjs/toolkit";
import genreGameSlice from "@/redux/slice/genreGameSlice";
import serviceGameSlice from "@/redux/slice/serviceGameSlice";
import gameSlice from "@/redux/slice/gameSlice";
import sellerLevelSlice from "@/redux/slice/sellerLevelSlice";

export const store = configureStore({
  reducer: {
    genreGame: genreGameSlice,
    serviceGame: serviceGameSlice,
    game: gameSlice,
    sellerLevel: sellerLevelSlice,
  },
});
