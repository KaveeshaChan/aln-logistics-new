-- ALN member login — users table.
-- Run this in phpMyAdmin (or `mysql < schema.sql`) against your cPanel MySQL
-- database once it's created. See AUTH.md for the full setup walkthrough.

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- `password` stores a PHP password_hash() value (bcrypt, ~60 chars) — never
-- plaintext. Generate one with `php scripts/hash-password.php <password>`
-- and paste the result here, e.g.:
--
-- INSERT INTO users (username, password, role)
-- VALUES ('admin', '$2y$10$replace-with-a-real-hash', 'Admin');
