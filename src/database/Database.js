const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const sqlLite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this._db = null;
    this._isDbClosed = false;
  }

  async _initDatabase() {
    await this.close();

    this._db = new sqlLite3.Database(':memory:');
    this._db.all = this._promisifySqlLiteFn(this._db.all);
    this._db.get = this._promisifySqlLiteFn(this._db.get);
    this._db.close = this._promisifySqlLiteFn(this._db.close);
  }

  _promisifySqlLiteFn(fn) {
    const { _db } = this;

    return promisify(fn).bind(_db);
  }

  _readSqlStatements(fileName) {
    if (!fileName) return null;

    const databaseInitSqlPath = path.join(__dirname, fileName);
    const fileContent = fs.readFileSync(databaseInitSqlPath, { encoding: 'UTF-8' });
    const statements = fileContent
      .replace(/--.*\n|^\s*/gm, '')
      .split(';\n')
      .filter((v) => !!v)
      .map((v) => v.replace(/\n/g, ''))
      .filter((v) => !v.startsWith('--'));

    if (!statements.length) return null;

    return statements;
  }

  /*
  crate method seed(fileName) that runs the content of the seed.sql file
   */
  async init(fileName = 'init.sql') {
    await this._initDatabase();

    const statements = this._readSqlStatements(fileName);

    if (!statements) return Promise.resolve();

    return new Promise((resolve) =>
      this._db.serialize(async () => {
        await Promise.all(statements.map((statement) => this.run(statement)));
        resolve();
      }),
    );
  }

  async inserts(fileName = 'inserts.sql') {
    const statements = this._readSqlStatements(fileName);

    if (!statements) return Promise.resolve();

    return new Promise((resolve) =>
      this._db.serialize(async () => {
        await Promise.all(statements.map((statement) => this.run(statement)));
        resolve();
      }),
    );
  }

  run(...params) {
    return new Promise((resolve, reject) => {
      this._db.run(...params, function runCallback(e) {
        if (e === null) {
          resolve(this.lastID);
        } else {
          reject(e);
        }
      });
    });
  }

  all(...params) {
    const { _db } = this;

    return _db.all(...params);
  }

  get(...params) {
    const { _db } = this;

    return _db.get(...params);
  }

  close(...params) {
    const { _db } = this;

    if (!_db || this._isDbClosed) return Promise.resolve();

    this._isDbClosed = true;
    return _db.close(...params);
  }
}

module.exports = Database;
