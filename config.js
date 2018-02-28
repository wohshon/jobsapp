var mssqlServer = process.env.MSSQL_SERVER,
    mssqlPort = process.env.MSSQL_PORT,
    mssqlUser =  process.env.MSSQL_USER,
    mssqlPwd =  process.env.MSSQL_SA_PASSWORD,
    mssqlDb =  process.env.MSSQL_DATABASE,
    mssqlPoolMax = process.env.MSSQL_MAXPOOL

var config = {
  user: mssqlUser,
  password: mssqlPwd,
  server: mssqlServer,
  port: mssqlPort,
  database: mssqlDb,
  pool: {
      max: mssqlPoolMax,
      min: 0,
      idleTimeoutMillis: 30000
  }
};
/*
var config = {

  user: 'sa',
  password: 'StrongP@ssW0rd',
  server: '52.230.124.252',
  port: '30000',
  database: 'JobsDB',
  pool: {
      max: 3,
      min: 0,
      idleTimeoutMillis: 30000
  }


};
*/
module.exports = config;
