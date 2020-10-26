require('dotenv').config();
const knex = require('knex');
const ArticlesService = require('./services/articlesService');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

ArticlesService.getAllArticles(knexInstance);
