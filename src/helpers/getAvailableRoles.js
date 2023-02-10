import { ROLES } from "../assets/constants/Fixtires";

export function getAvailableRoles() {
  switch (localStorage.userIdAccess) {
    case 1:
      return ROLES;
    case 2: 
        return ROLES.slice(0, 2)
    default:
      "";
  }
}
