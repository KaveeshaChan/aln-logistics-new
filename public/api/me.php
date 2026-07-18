<?php
/**
 * Returns the current session's user, if any. Polled on every page load by
 * AuthProvider (src/lib/auth-context.tsx) since this is a static multi-page
 * site — there's no server-rendered layout to carry auth state between
 * pages, so each page re-checks the session on mount.
 */

declare(strict_types=1);

require __DIR__ . "/session.php";

header("Content-Type: application/json; charset=utf-8");
aln_start_session();

if (!isset($_SESSION["user"])) {
    http_response_code(401);
    echo json_encode(["ok" => false, "error" => "Not authenticated"]);
    exit;
}

echo json_encode(["ok" => true, "user" => $_SESSION["user"]]);
