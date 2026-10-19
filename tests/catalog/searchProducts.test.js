const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

const ids = (list) => list.map((product) => product.id);

describe('searchProducts', () => {
  test("'Наушники' возвращает товар с ID 1", () => {
    expect(ids(searchProducts(products, 'Наушники'))).toEqual([1]);
  });

  test("'Чистый код' возвращает товар с ID 6", () => {
    expect(ids(searchProducts(products, 'Чистый код'))).toEqual([6]);
  });

  test("'Настольная лампа' возвращает товар с ID 4", () => {
    expect(ids(searchProducts(products, 'Настольная лампа'))).toEqual([4]);
  });

  test("'javascript' возвращает товар с ID 3", () => {
    expect(ids(searchProducts(products, 'javascript'))).toEqual([3]);
  });

  test("'ЧЕХОЛ' возвращает товар с ID 5", () => {
    expect(ids(searchProducts(products, 'ЧЕХОЛ'))).toEqual([5]);
  });

  test("'наушники' возвращает товар с ID 1", () => {
    expect(ids(searchProducts(products, 'наушники'))).toEqual([1]);
  });

  test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    expect(ids(searchProducts(products, ''))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    expect(ids(searchProducts(products, '   '))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(ids(searchProducts(products, '\t\n'))).toEqual([1, 2, 3, 4, 5, 6]);
  });
});