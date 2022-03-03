const mariaDB = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coderhouse'
  },
  useNullAsDefault: true
};

module.exports = { mariaDB };