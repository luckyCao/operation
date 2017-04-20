import mysql from 'mysql'

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'operation',
})

const connection = {
  query: function (query, params, callback) {
    pool.getConnection(function (err, connection) {
      if (err) {
        callback(err, null);
        throw err;
      }

      connection.query(query, params, function (err, rows) {
        connection.release();
        if (!err) {
          callback(null, rows);
        }
        else {
          callback(err, null);
        }

      });
    });
  }
}

export default connection
