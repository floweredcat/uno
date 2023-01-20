export const selectFranshisesModule = (state) => state.franshises;

export const selectFranshisesIds = (state) => selectFranshisesModule(state).ids;

export const selectFranshiseById = (state, {id}) => selectFranshisesModule(state).entities[id]