export const selectCityFranshisesModule = (state) => state.cityFranshises;

export const selectCityFranshisesIds = (state) =>
  selectCityFranshisesModule(state).ids;

export const selectCityFranshises = (state) =>
  selectCityFranshisesModule(state).entities;

export const selectCityFranshisesById = (state, { id }) =>
  selectCityFranshises(state)[id];
