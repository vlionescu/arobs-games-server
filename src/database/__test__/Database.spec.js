const db = require('..');

describe('[Database]', () => {
  const sqlAllTables = "SELECT name FROM sqlite_master WHERE type='table'";
  const sqlFile = '__test__/__mocks__/test.sql';

  it('should not create any tables if init is called with null', async () => {
    await db.init(null);

    const tables = await db.all(sqlAllTables);

    expect(tables).toHaveLength(0);
  });

  it('should create two tables', async () => {
    await db.init(sqlFile);

    const tables = await db.all(sqlAllTables);
    const expectedResult = [{ name: 'test' }, { name: 'sqlite_sequence' }];

    expect(tables).toHaveLength(2);
    expect(tables).toEqual(expectedResult);
  });

  it('should retrieve test row', async () => {
    await db.init(sqlFile);

    const row = await db.get('SELECT * from test');

    const expectedResult = { id: 1, name: 'test' };

    expect(row).toEqual(expectedResult);
  });

  it('should be able to add a row', async () => {
    const expectedResult = { id: 2, name: 'test name' };

    await db.init(sqlFile);

    const insertedId = await db.run('INSERT INTO test(name) VALUES("test name")');
    const row = await db.get('SELECT * FROM test where id = 2');

    expect(row).toEqual(expectedResult);
    expect(insertedId).toBeDefined();
    expect(insertedId).toEqual(2);
  });

  it('should be able to retrieve all rows', async () => {
    const expectedResult = [
      { id: 1, name: 'test' },
      { id: 2, name: 'test name' },
    ];

    await db.init(sqlFile);

    const insertedId = await db.run('INSERT INTO test(name) VALUES("test name")');
    const rows = await db.all('SELECT * FROM test');

    expect(rows).toEqual(expectedResult);
    expect(rows).toHaveLength(2);
    expect(insertedId).toBeDefined();
    expect(insertedId).toEqual(2);
  });

  it('should create a new database if the db is close and init', async () => {
    const expectedResult = [{ id: 1, name: 'test' }];

    await db.init(sqlFile);
    await db.run('INSERT INTO test(name) VALUES("test name")');
    await db.close();

    await db.init(sqlFile);
    const rows = await db.all('SELECT * FROM test');

    expect(rows).toEqual(expectedResult);
    expect(rows).toHaveLength(1);
  });
});
