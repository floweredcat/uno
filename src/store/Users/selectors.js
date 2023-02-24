export const selectUsersModule = (state) => state.users;

export const selectUsersIds = (state) => selectUsersModule(state)?.ids;

export const selectUsersIsLoading = (state) =>
  !["fail", "success"].includes(selectUsersModule(state).status);

export const selectUserDataById = (state, { id }) =>
  selectUsersModule(state).entities[id];

export const selectUserDataLength = (state) =>
  selectUsersModule(state).entities;
