<?php
/**
 * Verifies username/password against the `users` table and starts a session.
 * Called by src/lib/auth-context.tsx.
 */

declare(strict_types=1);

require __DIR__ . "/db.php";
require __DIR__ . "/session.php";

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    aln_json_error(405, "Method not allowed");
}

$data = json_decode(file_get_contents("php://input"), true);
$username = is_array($data) && is_string($data["username"] ?? null) ? trim($data["username"]) : "";
$password = is_array($data) && is_string($data["password"] ?? null) ? $data["password"] : "";

if ($username === "" || $password === "") {
    aln_json_error(422, "Username and password are required.");
}

$pdo = aln_db();
$stmt = $pdo->prepare("SELECT id, username, password, role FROM users WHERE username = :username LIMIT 1");
$stmt->execute(["username" => $username]);
$user = $stmt->fetch();

// Same generic error whether the username doesn't exist or the password is
// wrong — avoids leaking which usernames are registered.
if (!$user || !password_verify($password, $user["password"])) {
    aln_json_error(401, "Invalid username or password.");
}

aln_start_session();
session_regenerate_id(true);
$_SESSION["user"] = [
    "id" => (int) $user["id"],
    "username" => $user["username"],
    "role" => $user["role"],
];

echo json_encode(["ok" => true, "user" => $_SESSION["user"]]);
