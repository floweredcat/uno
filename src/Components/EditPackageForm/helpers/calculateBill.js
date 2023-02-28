export function calculateBill({ form, packagePrices }) {
  console.log(packagePrices, form);

  const pricesValues = Object.values(packagePrices);
  pricesValues.reduce((acc, item, idx) => {}, 0);
}
