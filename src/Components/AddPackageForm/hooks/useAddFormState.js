import { useState } from "react";
import { PERIOD_VALUES } from "../../../assets/constants/Fixtires";

export function useAddFormState() {
  const date = new Date();
  return useState({
    station: { ID: 1, klv: 1 },
    storage: {
      ID: 2,
      klv: 0,
    },
    calculation: {
      ID: 3,
      klv: 0,
    },
    tarifiation: {
      ID: 4,
      klv: 0,
    },
    waiter: {
      klv: 0,
      period: 1,
      ID: 5,
    },
    qr: {
      klv: 0,
      ID: 6,
    },
    date,
    period: PERIOD_VALUES[0].value,
  });
}
