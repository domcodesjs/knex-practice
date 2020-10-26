const table = 'shopping_list';

exports.getShoppingListItems = async (db) => {
  const items = await db(table).select('*');
  return items;
};

exports.getShoppingListItem = async (db, id) => {
  const item = await db(table).select('*').where({ id }).first();
  return item;
};

exports.createShoppingListItem = async (db, newItem) => {
  const item = (await db(table).insert(newItem).returning('*'))[0];
  return item;
};

exports.updateShoppingListItem = async (db, id, updatedItem) => {
  return (await db(table).where({ id }).update(updatedItem).returning('*'))[0];
};

exports.deleteShoppingListItem = async (db, id) => {
  return (await db(table).where({ id }).delete().returning('*'))[0];
};
