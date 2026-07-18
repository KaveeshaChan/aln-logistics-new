<?php
/**
 * Destroys the current session. Called by the Logout button in
 * src/components/account/account-content.tsx.
 */

declare(strict_types=1);

require __DIR__ . "/session.php";

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

aln_start_session();
$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        "",
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"],
    );
}

session_destroy();

echo json_encode(["ok" => true]);
