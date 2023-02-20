import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../assets/constants/Fixtires";
import { getDiffInMonths } from "../../helpers/getDiffDates.ts";
import { separateAmount } from "../../helpers/separateAmount.ts";
import { selectObjectFilters } from "../../store/ObjectFilter/selectors";
import { selectObjectById } from "../../store/Objects/selectors";
import { UserData } from "../../Components/UserData/UserData";
import styles from "./styles.module.css";

export const ObjectDataContainer = ({ id, selectedRow }) => {
  const navigate = useNavigate();
  const object = useSelector((state) => selectObjectById(state, { id }));
  const filter = useSelector((state) => selectObjectFilters(state));
  const data = [
    object.IDSRV,
    object.NAME,
    object.CITY,
    object.PHONE,
    object.DT,
    object.FRAN_NAME,
    object.AMOUNT ? separateAmount(object.AMOUNT) : 0,
  ];
  const dataForFilter = object;

  const diffDates = getDiffInMonths({
    start: object.STARTDT,
    end: object.ENDDT,
  });
  const filterTitles = Object.keys(filter);

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

  const isSelected = () => {
    return filterTitles.every((el) => {
      return dataForFilter[el]
        ?.toString()
        ?.toLowerCase()
        ?.includes(filter[el]?.toString().toLowerCase());
    });
  };
  if (isSelected()) {
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
  } else return null;
};
