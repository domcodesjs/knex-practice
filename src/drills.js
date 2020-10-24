require('dotenv').config();
const express = require('express');
const knex = require('knex');
const app = express();
const PORT = process.env.PORT || 5000;
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const findProductByName = async (searchTerm) => {
  const query = await knexInstance('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`);
  console.log(query);
};

const getProductsPaginated = async (page) => {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page - 1);
  const query = await knexInstance('shopping_list')
    .select('*')
    .limit(itemsPerPage)
    .offset(offset);
  console.log(query);
  return query;
};

const getProductsAddedAfter = async (daysAgo) => {
  const query = await knexInstance('shopping_list')
    .select('*')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    );
  console.log(query);
  return query;
};

const getCostPerCategory = async () => {
  const query = await knexInstance('shopping_list')
    .select('category')
    .sum('price')
    .groupBy('category');
  console.log(query);
  return query;
};

// findProductByName('bacon')
// getProductsPaginated(3);
// getProductsAddedAfter(4);
getCostPerCategory();

app.listen(PORT, () => console.log(`Express is running no port ${PORT}`));
