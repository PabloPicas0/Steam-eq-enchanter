import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Slices/profileSlice";
import itemsFromMarketReducer from "./Slices/itemsFromMarketSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    itemsFromMarket: itemsFromMarketReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
