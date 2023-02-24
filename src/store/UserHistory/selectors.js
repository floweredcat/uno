export const selectUserHistoryModule = (state) => state.userHistory;

export const selectUserHistory = (state) =>
  selectUserHistoryModule(state).entities;

export const selectUserHistoryById = (state, { id }) =>
  Object.values(selectUserHistory(state)[id] || {});

export const selectUserHistoryIdsById = (state, { id }) =>
  Object.values(selectUserHistory(state)[id] || {});
