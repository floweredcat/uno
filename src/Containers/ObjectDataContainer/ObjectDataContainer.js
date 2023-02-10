import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../assets/constants/Fixtires";
import { UserData } from "../../Components/UserData/UserData";
import { getDiffInMonths } from "../../helpers/getDiffDates.ts";
import { separateAmount } from "../../helpers/separateAmount.ts";
import { selectObjectById } from "../../store/Objects/selectors";
import styles from "./styles.module.css";

export const ObjectDataContainer = ({ onclick, id, filter, selectedRow }) => {
  const navigate = useNavigate();
  const object = useSelector((state) => selectObjectById(state, { id }));
  const data = [
    object.IDSRV,
    object.NAME,
    object.CITY,
    object.PHONE,
    object.DT,
    object.FRAN_NAME,
    object.AMOUNT ? separateAmount(object.AMOUNT) : 0,
  ];

  const diffDates = getDiffInMonths({ start: object.STARTDT, end: object.ENDDT });

  const getStyleByLeftMonths = () => {
    if (diffDates < 1) {
      return styles.red;
    }
    if (diffDates === 1) {
      return styles.yellow;
    }
    if (diffDates > 1) {
      return styles.green;
    }
  };

  if (!object.NAME.toLowerCase().includes(filter.name.toLowerCase())) {
    return null;
  }

  return (
    <tr
      className={classNames(styles.table_row, getStyleByLeftMonths())}
      onDoubleClick={() => navigate(ROUTES.objects + `/${object.IDSRV}`)}>
      <UserData
        data={data}
        selectedRow={selectedRow}
      />
    </tr>
  );
};
