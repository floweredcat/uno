export function calculateBull({ form, packagesPrices }) {
  const { pack, packagePeriod, office, officePeriod,  } = form;
  const bill = {};

  switch (pack) {
    default: {
      bill.error = "Error calculate";
      break;
    }
    case "Max":
      bill.package = packagesPrices.Max.PRICE * packagePeriod;
      break;
    case "Base":
      bill.package = packagesPrices.Base.PRICE * packagePeriod;
      break;
    case "Start":
      bill.package = packagesPrices.Start.PRICE * packagePeriod;
  }
}
