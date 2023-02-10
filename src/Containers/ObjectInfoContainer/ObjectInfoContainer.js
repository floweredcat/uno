import { nanoid } from "nanoid";
import { ObjectInfoElement } from "../../Components/ObjectInfoElement/ObjectDataElement";
import styles from "./styles.module.css";

export const ObjectInfoContainer = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map(el => <ObjectInfoElement objectData={el} key={nanoid()}/>) }
    </div>
  );
};
