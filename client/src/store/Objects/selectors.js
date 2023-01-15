export const selectObjectsModule = (state) => state.objects;

export const selectObjectsIsLoading = (state) => selectObjectsModule(state).status === 'loading'

export const selectObjectsIds = (state) => selectObjectsModule(state).ids;

export const selectObjectById = (state, {id}) => selectObjectsModule(state).entities[id]

export const selectObjectData = (state) => selectObjectsModule(state).entities