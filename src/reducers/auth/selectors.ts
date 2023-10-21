import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.Auth.tokens,
  (tokens) => !!tokens
);

export const selectToken = createSelector(
  (state: RootState) => state.Auth.tokens,
  (tokens) => tokens?.idToken
);

export const selectAccessToken = createSelector(
  (state: RootState) => state.Auth.tokens,
  (tokens) => tokens?.accessToken ?? ''
);

export const selectRefreshToken = createSelector(
  (state: RootState) => state.Auth.tokens,
  (tokens) => tokens?.refreshToken ?? ''
);