const sqlite = {
  client: 'sqlite3',
  connection: {filename: './db/sqlite/db/mydb.sqlite'},
  useNullAsDefault: true,
};

module.exports = { sqlite };