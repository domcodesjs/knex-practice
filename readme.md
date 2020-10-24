# Assignment

Your employer, Dunder Mifflin, has set you the task create tables and Knex queries for the Shopping List application that you built for the React module.

This assignment consists of two parts:

- setting up new tables
- and completing drills using knex.

Firstly, add a SQL file called create.shopping-list.sql in the knex-practice project's ./sql-scripts folder. This file should contain the SQL to create a new TYPE called grocery and a new TABLE called shopping_list. The table will contain 6 columns and you will need to decide which SQL data types to use for each column. We'll supply you with a second SQL file that you will use to seed the shopping_list table items.

The grocery TYPE should be an ENUM that can be one of the following possible values:

- Main
- Snack
- Lunch
- Breakfast

The shopping_list table should have the following 6 columns. None of the columns should allow null values.

- A primary key column id
- A name column
- A price column that should not be a string and support 2 decimal places.
- A date_added column that should default to now().
- A checked column that should be a BOOLEAN with a default of false.
- A category column. Use the grocery type you created for this column.

## Drills

With the shopping_list table in place, make a new file inside your knex-practice project, ./src/drills.js. Inside the drills file, connect knex to your knex-practice database and write functions that can perform the following queries:

1. Get all items that contain text

   - A function that takes one parameter for searchTerm which will be any string
   - The function will query the shopping_list table using Knex methods and select the rows which have a name that contains the searchTerm using a case insensitive match.

2. Get all items paginated

   - A function that takes one parameter for pageNumber which will be a number
   - The function will query the shopping_list table using Knex methods and select the pageNumber page of rows paginated to 6 items per page.

3. Get all items added after date

   - A function that takes one parameter for daysAgo which will be a number representing a number of days.
   - This function will query the shopping_list table using Knex methods and select the rows which have a date_added that is greater than the daysAgo.

4. Get the total cost for each category

   - A function that takes no parameters
   - The function will query the shopping_list table using Knex methods and select the rows grouped by their category and showing the total price for each category.
