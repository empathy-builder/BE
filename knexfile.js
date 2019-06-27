const dbConnection = process.env.DATABASE_URL

module.exports = {
    production: {
      client: 'pg',
      connection: dbConnection,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/data.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
  
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './data/test.db3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
  };
  