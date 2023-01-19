export const selectUsersModule = (state) => state.users;

export const selectUsersIds = (state) => selectUsersModule(state)?.ids

export const selectUsersIsLoading = (state) => selectUsersModule(state).status === "loading"

export const selectUserDataById = (state, {id}) => selectUsersModule(state).entities[id]