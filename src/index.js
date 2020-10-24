require('dotenv').config();
const express = require('express');
const knex = require('knex');
const app = express();
const PORT = process.env.PORT || 5000;
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const getMostPopularVideos = async (days) => {
  const query = await knexInstance('whopipe_video_views')
    .select(['video_name', 'region'])
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' }
    ]);
  console.log(query);
  return query;
};
getMostPopularVideos(30);

app.listen(PORT, () => console.log(`Express is running no port ${PORT}`));
