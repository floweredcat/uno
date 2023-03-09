export const FOLDERS = {
  users: "Пользователи",
  profile: "Профиль",
  objects: "Объекты",
  account: "Баланс",
};

export const ROUTES = {
  auth: "/",
  layout: "/*",
  users: "/users",
  objects: "/objects",
  profile: "/profile",
  user: "/users/:id",
  object: "/objects/:id",
  recover: "recover/:hash",
  forgot: "forgot",
};

export const ROLES = [
  { content: "admin", id: 1 },
  { content: "master franshase", id: 2 },
  { content: "local franshase", id: 3 },
  { content: "user", id: 4 },
];

export const PERIOD_VALUES = [
  { label: "1 месяц", value: 1 },
  { label: "3 месяца", value: 3 },
  { label: "6 месяцев", value: 6 },
  { label: "1 год", value: 12 },
  { label: "Навсегда", value: 36 },
];
