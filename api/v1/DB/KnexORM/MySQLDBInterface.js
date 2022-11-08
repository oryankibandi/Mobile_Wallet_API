const Events = require("node:events");

class MySQLDB extends Events {
  constructor(knex) {
    super();
    this.knex = knex;
  }

  async insert(table, values, returnValues = []) {
    const rowsInserted = await this.knex
      .insert(values, [...returnValues])
      .into(table);

    if (rowsInserted === 0) throw new Error("Error inserting rows");

    this.emit("rowsInserted", rowsInserted);
  }

  async update(table, filter, values) {
    const updatedRows = await this.knex(table).where(filter).update(values);

    if (updatedRows === 0) throw new Error("Error inserting rows");

    this.emit("rowsUpdated", updatedRows);
  }

  delete(table, filter) {
    this.knex(table).where(filter).delete();
  }

  async select(table, fields) {
    if (fields.length == 0) {
      const results = await this.knex.select().from(table);
      return results;
    } else {
      const res = await this.knex.select(...fields).from(table);

      return res;
    }
  }

  async find(table, filter, fields = []) {
    if (fields.length == 0) {
      const results = await this.knex(table).where(filter).select();
      return results;
    } else {
      const res = await this.knex(table)
        .where(filter)
        .select(...fields);

      return res;
    }
  }

  async increment(table, filter, field, incrementValue) {
    await this.knex(table).where(filter).increment(field, incrementValue);
  }

  async decrement(table, filter, field, decrementValue) {
    await this.knex(table).where(filter).decrement(field, decrementValue);
  }
}

module.exports = MySQLDB;
