const optionslite = require('knex')({
    client: 'sqlite3',
    connection: { filename: `./DB/mydb.sql` },
    useNullAsDefault: true
  })
  
  module.exports = {
    optionslite
  };