import geoIcon from "../../../assets/images/geo.svg";
import partnerIcon from "../../../assets/images/partner.svg";
import phoneIcon from "../../../assets/images/phone.svg";
import timerIcon from "../../../assets/images/timer.svg";
import endtimerIcon from "../../../assets/images/endtimer.svg";
import { getLeftTime } from "../../../helpers/getLeftMonth.ts";

interface ObjectData {
  DT: string;
  NAME: string;
  WORKER: string;
  CITY: string;
  PHONE: string;
  STARTDT?: string;
  ENDDT?: string;
}

export function useInfoEntities(objectData: ObjectData) {
  const { DT, NAME, WORKER, CITY, PHONE, STARTDT, ENDDT } = objectData || {};

  const { months, daysLeft } = getLeftTime({
    start: objectData?.STARTDT,
    end: objectData?.ENDDT,
  });

  const packageTimeLeft = months
    ? months
    : "" + daysLeft
    ? " " + daysLeft
    : " ";

  return [
    [
      {
        img: null,
        title: "Название",
        content: NAME,
      },
      {
        img: null,
        title: "Дата создания",
        content: DT,
      },
      {
        img: null,
        title: "Специалист",
        content: WORKER,
      },
    ],
    [
      {
        img: geoIcon,
        title: "Город/Страна",
        content: CITY,
      },
      {
        img: partnerIcon,
        title: "Партнер",
        content: "UM System Group",
      },
      {
        img: phoneIcon,
        title: "Телефон",
        content: PHONE,
      },
    ],
    [
      {
        img: timerIcon,
        title: "Начало",
        content: STARTDT || "Пакет не активен",
      },
      {
        img: endtimerIcon,
        title: "Конец",
        content: ENDDT || "Пакет не активен",
      },
      {
        img: timerIcon,
        title: "Осталось",
        content: packageTimeLeft,
      },
    ],
  ];
}
