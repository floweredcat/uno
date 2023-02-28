export const selectObjectsModule = (state) => state.objects;

export const selectObjectsIsLoading = (state) =>
  !["fail", "success"].includes(selectObjectsModule(state).status);

export const selectObjectsIds = (state) => selectObjectsModule(state).ids;

export const selectObjectById = (state, { id }) =>
  selectObjectsModule(state).entities[id];

export const selectObjectTarifById = (state, { id }) =>
  selectObjectById(state, { id }).lic;

export const selectObjectData = (state) => selectObjectsModule(state).entities;
