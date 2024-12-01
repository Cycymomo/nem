import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

// Create a single pool and reuse it
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// TOFIX: Suggested table structure for a Users table
// --
// -- Table structure for table `Users`
// --

// CREATE TABLE `Users` (
//   `user_id` int NOT NULL,
//   `username` varchar(255) NOT NULL,
//   `email` varchar(255) NOT NULL,
//   `password` varchar(255) NOT NULL,
//   `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//   `is_admin` tinyint(1) NOT NULL DEFAULT '0'
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
// --
// -- Indexes for table `Users`
// --
// ALTER TABLE `Users`
//   ADD PRIMARY KEY (`user_id`),
//   ADD UNIQUE KEY `username` (`username`),
//   ADD UNIQUE KEY `email` (`email`);

// --
// -- AUTO_INCREMENT for dumped tables
// --

// --
// -- AUTO_INCREMENT for table `Users`
// --
// ALTER TABLE `Users`
//   MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
// COMMIT;
