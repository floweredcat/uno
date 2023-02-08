
import styles from "./styles.module.css";
import { Table } from "../Table/Table";
import {TableHeader} from "../TableHeader/TableHeader";
import {UserData} from '../UserData/UserData'
export const Account = () => {
    return (
        <div className={styles.account_wrapper}>
        <Table>
        <TableHeader
          headers={[
            "Дата операции",
            "Пользователь",
            "Номер операции",
            "Поступило",
            "Списано",
          ]}
        />
        <UserData
          data={[
            "Дата операции",
            "Пользователь",
            "Номер операции",
            "Поступило",
            "Списано",
          ]}
        />
      </Table>
        </div>
    )
}