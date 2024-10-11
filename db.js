const mysql = require('mysql2/promise');

// Create the connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "portfolio",
  password: "password",
});

(async () => {
  try {
    const connection = await pool.getConnection(); // Attempt to get a connection from the pool
    console.log('MySQL connection established successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error establishing MySQL connection:', err.message);
  }
})();


// Export the pool so it can be used in other modules
module.exports = pool;
