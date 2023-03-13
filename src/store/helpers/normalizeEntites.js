export const normolizeEntities = (entities, idFieldName = "ID") => ({
  entities: entities.reduce((acc, entity) => {
    acc[entity[idFieldName]] = entity;

    return acc;
  }, {}),
  ids: entities.map((entity) => entity[idFieldName]),
});
