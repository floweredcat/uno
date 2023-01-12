export const selectUsersModule = (state) => state.auth;

export const selectUserAuthenticated = (state) =>
  selectUsersModule(state).isAuthenticated;

export const selectUserData = (state) => selectUsersModule(state).userData;

export const selectUserId = (state) => selectUserData(state).ID;

export const selectUserName = (state) => selectUserData(state).NAME;
