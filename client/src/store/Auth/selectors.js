export const selectUsersModule = (state) => state.auth;

export const selectUsers = (state) => selectUsersModule(state).entities;

export const selectUserByEmail = (state, {email}) =>
  selectUsers(state)[email] ? selectUsers(state)[email] : false;

export const selectUserPasswordByEmail = (state, {email}) => selectUserByEmail(state, {email})?.password

export const selectAuthUser = (state) => selectUsersModule(state).authUser