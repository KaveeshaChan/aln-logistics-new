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

-- Network directory shown on the Admin account dashboard
-- (src/components/admin/network-members-table.tsx), served by
-- public/api/network-members.php instead of a hardcoded TS array.
CREATE TABLE IF NOT EXISTS network_members (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  member VARCHAR(150) NOT NULL DEFAULT '',
  country VARCHAR(100) NOT NULL,
  country_code CHAR(2) NOT NULL,
  company VARCHAR(200) NOT NULL,
  url VARCHAR(255) NOT NULL DEFAULT '',
  email VARCHAR(150) NOT NULL DEFAULT '',
  phone VARCHAR(50) NOT NULL DEFAULT '',
  logo_url VARCHAR(500) DEFAULT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- After creating this table, run database/seed-network-members.sql once to
-- load the existing directory (89 rows, converted from the previous
-- src/lib/network-members.ts) into it.
