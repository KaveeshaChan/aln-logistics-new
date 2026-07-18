<?php
/**
 * Copy this file to config.php and fill in your cPanel MySQL credentials.
 * config.php is gitignored — never commit real credentials.
 *
 * cPanel MySQL is almost always reachable at "localhost". Database and user
 * names are typically prefixed with your cPanel account name, e.g.
 * "cpaneluser_aln" — find the exact values under cPanel → MySQL Databases.
 */

return [
    "host" => "localhost",
    "dbname" => "cpaneluser_aln",
    "user" => "cpaneluser_aln",
    "pass" => "changeme",
];
