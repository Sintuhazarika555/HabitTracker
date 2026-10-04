import mysql from 'mysql2/promise'; // Import the mysql2/promise module for MySQL database connection
import dotenv from 'dotenv';  // Import the dotenv module to load environment variables from a .env file

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'habit_tracker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const testDBConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Database Connected Successfully!');
        connection.release();
    } catch (error) {
        console.error('MySQL Connection Failed:', error.message);
    }
};