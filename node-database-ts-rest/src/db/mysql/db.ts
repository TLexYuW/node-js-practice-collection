import mysql from 'mysql2/promise';

export const mysqlpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'test_db',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

mysqlpool.getConnection().then(() => console.log("MySQL Connection Successfully!"));

/*
mysqlpool.query("SELECT 1")
.then(() => console.log("db conn succeeded, qeury..."))
.catch(err => console.log("db conn failed.\n" + err));
*/
