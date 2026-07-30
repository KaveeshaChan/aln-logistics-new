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

/**
 * Starts the session and returns the logged-in user, or sends a 401 and
 * exits if there isn't one. Used by endpoints that need any authenticated
 * user (not necessarily Admin).
 */
function aln_require_user(): array {
    aln_start_session();
    if (!isset($_SESSION["user"])) {
        http_response_code(401);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["ok" => false, "error" => "Not authenticated"]);
        exit;
    }
    return $_SESSION["user"];
}

/**
 * Same as aln_require_user(), but also requires the Admin role. Used by the
 * network-members write endpoints, matching the client-side Admin-only gate
 * in src/components/account/account-content.tsx.
 */
function aln_require_admin(): array {
    $user = aln_require_user();
    if (($user["role"] ?? null) !== "Admin") {
        http_response_code(403);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["ok" => false, "error" => "Admin access required"]);
        exit;
    }
    return $user;
}
