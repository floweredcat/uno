export const selectObjectsModule = (state) => state.objects;

export const selectObjectsIsLoading = (state) => !['fail', 'success'].includes(selectObjectsModule(state).status)

export const selectObjectsIds = (state) => selectObjectsModule(state).ids;

export const selectObjectById = (state, {id}) => selectObjectsModule(state).entities[id]

export const selectObjectData = (state) => selectObjectsModule(state).entities