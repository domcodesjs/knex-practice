require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');
const ShoppingListService = require('../services/shoppingListService');
const table = 'shopping_list';

describe('Shopping List Service', () => {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '12.00',
      category: 'Main'
    },
    {
      id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '3.00',
      category: 'Lunch'
    },
    {
      id: 4,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '0.99',
      category: 'Breakfast'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => db(table).truncate());

  afterEach(() => db(table).truncate());

  after(() => db.destroy());

  context('Given shopping_list table has no data', () => {
    beforeEach(async () => db(table).insert(testItems));

    it('getShoppingListItems() should resolve all items from shopping_list table', async () => {
      const actualItems = await ShoppingListService.getShoppingListItems(db);
      const expectedItems = testItems.map((item) => ({
        ...item,
        checked: false
      }));
      return expect(actualItems).to.eql(expectedItems);
    });

    it('getShoppingListItem() should resolve a single item from shopping_list table', async () => {
      const actualItem = await ShoppingListService.getShoppingListItem(db, 1);
      const expectedItem = { ...testItems[0], checked: false };
      return expect(actualItem).to.eql(expectedItem);
    });

    it('createShoppingListItem() should add a single item to shopping_list table', async () => {
      const expectedItem = {
        id: 5,
        name: 'Fifth test item!',
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        price: '3.00',
        category: 'Lunch',
        checked: false
      };
      const actualItem = await ShoppingListService.createShoppingListItem(db, {
        id: 5,
        name: 'Fifth test item!',
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        price: '3.00',
        category: 'Lunch'
      });
      return expect(actualItem).to.eql(expectedItem);
    });

    it('updateShoppingListItem() should update a single item from shopping_list table', async () => {
      const updatedItem = {
        ...testItems[0],
        name: 'First Test Item Updated',
        checked: true
      };
      const actualItem = await ShoppingListService.updateShoppingListItem(
        db,
        1,
        {
          name: 'First Test Item Updated',
          checked: true
        }
      );
      return expect(actualItem).to.eql(updatedItem);
    });

    it('deleteShoppingListItem() should delete a single item from shopping_list table', async () => {
      const actualItem = await ShoppingListService.deleteShoppingListItem(
        db,
        1
      );
      const expectedItem = { ...testItems[0], checked: false };
      return expect(actualItem).to.eql(expectedItem);
    });
  });

  context('Given shopping_list table has no data', () => {
    it('getAllItems() resolves to an empty array', async () => {
      const actual = await ShoppingListService.getShoppingListItems(db);
      return expect(actual).to.eql([]);
    });

    it('createShoppingListItem() should add a single item to empty shopping_list table', async () => {
      const expectedItem = {
        id: 5,
        name: 'Fifth test item!',
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        price: '3.00',
        category: 'Lunch',
        checked: false
      };
      const actualItem = await ShoppingListService.createShoppingListItem(db, {
        id: 5,
        name: 'Fifth test item!',
        date_added: new Date('1919-12-22T16:28:32.615Z'),
        price: '3.00',
        category: 'Lunch'
      });
      return expect(actualItem).to.eql(expectedItem);
    });
  });
});
