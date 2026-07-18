<?php
/**
 * Local-only helper: prints a password_hash() value to paste into an INSERT
 * statement via phpMyAdmin. Never deploy this file — it stays out of public/
 * so `next build` never copies it into the exported site.
 *
 * Usage: php scripts/hash-password.php "your-password-here"
 */

declare(strict_types=1);

if ($argc < 2 || $argv[1] === "") {
    fwrite(STDERR, "Usage: php scripts/hash-password.php <password>\n");
    exit(1);
}

echo password_hash($argv[1], PASSWORD_DEFAULT) . "\n";
