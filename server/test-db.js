const pool = require("./db");

const testConnection = async () => {
  try {
    const result = await pool.query("SELECT current_database()");

    console.log("Connected to: ", result.rows[0].current_database);
  } catch (error) {
    console.log("Connection failed: ", error.message);
  } finally {
    await pool.end();
  }
};

testConnection();
