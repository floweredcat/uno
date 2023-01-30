export const selectObjectPricesModule = (state) => state.objectsPrices;

export const selectObjectPricePackages = (state) =>
  selectObjectPricesModule(state).entities;
