export const selectUsersModule = (state) => state.auth;

export const selectUserAuthenticated = (state) =>
  selectUsersModule(state).isAuthenticated;

export const selectUserData = (state) => selectUsersModule(state).userData;

export const selectUserId = (state) => selectUserData(state).ID;

export const selectUserName = (state) => selectUserData(state).NAME;

export const selectIsUserLoading = (state) => selectUsersModule(state)?.status === 'loading'

export const selectIsUserSuccess = (state) => selectUsersModule(state)?.status === 'successLoading'

export const selectUserLoadingStatus = (state) => selectUsersModule(state).status

export const selectUserErrorMessage = (state) => selectUsersModule(state).err;