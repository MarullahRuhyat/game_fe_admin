// redux/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const sellerLevelSlice = createSlice({
  name: "smartReplies",
  initialState: {
    sellerLevel: [],
    isFetchSellerLevel: false,
    error: null,
  },
  reducers: {
    resetSellerLevel: (state) => {
      state.sellerLevel = [];
      state.isFetchSellerLevel = false;
    },
    setSellerLevel: (state, action) => {
      state.sellerLevel = action.payload;
      state.isFetchSellerLevel = true;
    },
    updateSellerLevel: (state, action) => {
      const data = action.payload;

      let sellerLevel = JSON.parse(JSON.stringify(state.sellerLevel));
      const index = sellerLevel.findIndex((item) => item.id === data.id);
      sellerLevel[index] = data;
      state.sellerLevel = sellerLevel;
    },
  },
});

// Ekspor action
export const {
  setSellerLevel,
  updateSellerLevel,
  isFetchSellerLevel,
  resetSellerLevel,
} = sellerLevelSlice.actions;
// Ekspor reducer
export default sellerLevelSlice.reducer;
