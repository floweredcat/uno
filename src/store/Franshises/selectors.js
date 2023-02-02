export const selectFranshisesModule = (state) => state.franshises;

export const selectFranshisesIds = (state) => selectFranshisesModule(state).ids;

export const selectFranshises = (state) => selectFranshisesModule(state).entities