import { useSelector } from "react-redux";
import { UserData } from "../../Components/UserData/UserData";

export const AccountDataContainer = ({onclick, id}) => {
    const object = useSelector((state) => selectObjectById(state, { id }));
    const data = [
      object.IDSRV,
      object.NAME,
      object.CITY,
      object.PHONE,
      object.FRAN_NAME,
      object.AMOUNT ? separateAmount(object.AMOUNT) : 0,
    ];

    return (
        <tr
          className={classNames(styles.table_row, getStyleByLeftMonths())}
          onDoubleClick={() => onclick(data[0], )}>
          <UserData
            data={data}
            selectedRow={selectedRow}
          />
        </tr>
      );
}