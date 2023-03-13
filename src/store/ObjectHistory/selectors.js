export const selectObjectHistoryModule = (state) => state.objectHistory;

export const selectObjectHistory = (state) =>
  selectObjectHistoryModule(state).entities;

export const selectObjectHistoryById = (state, { id }) =>
  Object.values(
    selectObjectHistory(state)[id]?.entities
      ? selectObjectHistory(state)[id]?.entities
      : {}
  );
