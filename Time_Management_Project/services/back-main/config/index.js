module.exports = {
    PORT: process.env.PORT || 9000,
    SQL_CONNECTION_HOST: process.env.MYSQL_HOST || 'localhost',
    SQL_CONNECTION_USER: process.env.MYSQL_USER || 'root',
    SQL_CONNECTION_DATABASE: process.env.MYSQL_DB || 'company',
    SQL_CONNECTION_PASSWORD: process.env.MYSQL_PASS   ||'root1',
    SQL_CONNECTION_PORT:  process.env.MYSQL_PORT || '3306',
    POOL: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    FRONT_ADDRESS: 'https://itimeapplication.ru',
    BACK_ADDRESS: 'https://itimeapplication.com'
}