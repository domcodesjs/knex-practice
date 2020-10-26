const table = 'blogful_articles';

exports.getAllArticles = async (db) => {
  const query = await db(table).select('*');
  return query;
};

exports.insertArticle = async (db, article) => {
  const newArticle = (await db(table).insert(article).returning('*'))[0];
  return newArticle;
};

exports.getById = async (db, id) => {
  const item = await db(table).select('*').where({ id }).first();
  return item;
};

exports.deleteArticle = async (db, id) => {
  return await db(table).where({ id }).delete();
};

exports.updateArticle = async (knex, id, newArticleFields) => {
  return await knex(table).where({ id }).update(newArticleFields);
};
