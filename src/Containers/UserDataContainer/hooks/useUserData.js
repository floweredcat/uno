import { ROLES } from "../../../assets/constants/Fixtires";
import { separateAmount } from "../../../helpers/separateAmount.ts";
export function useUserData(user) {
  let { ID, NAME, EMAIL, PHONE, IDACCESS, FRANCH, BALANCE } = user;

  BALANCE = BALANCE ? separateAmount(BALANCE) : 0;
  FRANCH = FRANCH ? FRANCH : "-";
  const ROLE = ROLES[IDACCESS - 1].content;
  return { ID, NAME, EMAIL, PHONE, ROLE, FRANCH, BALANCE };
}
