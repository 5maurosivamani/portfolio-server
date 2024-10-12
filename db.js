const mysql = require("mysql2/promise");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Create the connection to the database
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

(async () => {
  try {
    const connection = await pool.getConnection(); // Attempt to get a connection from the pool
    console.log("MySQL connection established successfully!");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Error establishing MySQL connection:", err.message);
  }
})();

// Export the pool so it can be used in other modules
module.exports = pool;
