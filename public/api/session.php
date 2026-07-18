<?php
/**
 * Session bootstrap shared by login.php, me.php and logout.php.
 * Session-cookie auth works here because the PHP endpoints and the static
 * site are served from the same origin on cPanel — fetch() sends the cookie
 * automatically for same-origin requests, no CORS setup needed.
 */

declare(strict_types=1);

function aln_start_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off";

    session_set_cookie_params([
        "lifetime" => 0,
        "path" => "/",
        "domain" => "",
        "secure" => $secure,
        "httponly" => true,
        "samesite" => "Lax",
    ]);
    session_name("aln_session");
    session_start();
}
