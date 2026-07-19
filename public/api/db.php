<?php
/**
 * Shared MySQL connection for the api/ endpoints. See config.example.php.
 */

declare(strict_types=1);

// No `never` return type — kept compatible with PHP 8.0, which some
// cPanel plans still default to (8.1 introduced that type).
function aln_json_error(int $status, string $message): void {
    http_response_code($status);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(["ok" => false, "error" => $message]);
    exit;
}

function aln_db(): PDO {
    $configPath = __DIR__ . "/config.php";
    if (!file_exists($configPath)) {
        aln_json_error(
            500,
            "Missing public/api/config.php. Copy config.example.php to config.php and fill in your MySQL credentials.",
        );
    }

    $config = require $configPath;

    // config.php must `return [...]` (see config.example.php) — a common
    // mistake is writing `define("DB_HOST", ...)` style constants instead,
    // which makes `require` return 1 here instead of an array.
    if (
        !is_array($config)
        || !isset($config["host"], $config["dbname"], $config["user"], $config["pass"])
    ) {
        aln_json_error(
            500,
            "public/api/config.php must `return` an array with host, dbname, user, pass keys — see config.example.php.",
        );
    }

    /** @var array{host:string,dbname:string,user:string,pass:string} $config */
    $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4";

    try {
        return new PDO($dsn, $config["user"], $config["pass"], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException) {
        aln_json_error(500, "Database connection failed.");
    }
}
