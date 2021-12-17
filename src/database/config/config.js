require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME2, 
    "password": process.env.DB_PASS2,
    "database": process.env.DB_NAME2,
    "host": process.env.DB_HOST2,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME2, 
    "password": process.env.DB_PASS2,
    "database": process.env.DB_NAME2,
    "host": process.env.DB_HOST2,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME2, 
    "password": process.env.DB_PASS2,
    "database": process.env.DB_NAME2,
    "host": process.env.DB_HOST2,
    "dialect": "mysql"
  }
}
