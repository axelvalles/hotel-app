import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice, authPreloadState, authListener } from "./features/auth";
import { authApi, hotelApi } from "./apis";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    auth: authPreloadState(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authListener.middleware)
      .concat(authApi.middleware)
      .concat(hotelApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
