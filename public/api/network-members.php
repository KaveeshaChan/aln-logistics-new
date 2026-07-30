<?php
/**
 * CRUD for the `network_members` table, backing the Admin dashboard's
 * network directory (src/components/admin/network-members-table.tsx).
 * Replaces the previous hardcoded src/lib/network-members.ts array.
 *
 * GET    — list all members (any authenticated user — Admin or User)
 * POST   — create a member (Admin only)
 * PUT    — update a member by id (Admin only)
 * DELETE — delete a member by id (Admin only)
 *
 * The User role gets read-only access: account-content.tsx renders
 * NetworkMembersTable with readOnly for non-Admins, which hides the Add
 * Member button and the per-row edit/delete actions client-side — but the
 * write methods below re-check the role server-side too, since a client-side
 * hide is not real access control.
 */

declare(strict_types=1);

require __DIR__ . "/db.php";
require __DIR__ . "/session.php";

header("Content-Type: application/json; charset=utf-8");

function aln_row_to_member(array $row): array {
    return [
        "id" => (int) $row["id"],
        "member" => $row["member"],
        "country" => $row["country"],
        "countryCode" => $row["country_code"],
        "company" => $row["company"],
        "url" => $row["url"],
        "email" => $row["email"],
        "phone" => $row["phone"],
        "logoUrl" => $row["logo_url"],
        "imageUrl" => $row["image_url"],
    ];
}

/** Reads and lightly validates the shared member fields from a JSON body. */
function aln_member_input(): array {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!is_array($data)) {
        aln_json_error(422, "Invalid request body.");
    }

    $str = fn($key) => is_string($data[$key] ?? null) ? trim($data[$key]) : "";
    $nullableStr = fn($key) => is_string($data[$key] ?? null) && $data[$key] !== "" ? $data[$key] : null;

    $country = $str("country");
    $countryCode = strtoupper($str("countryCode"));
    $company = $str("company");

    if ($country === "" || $countryCode === "" || $company === "") {
        aln_json_error(422, "country, countryCode and company are required.");
    }
    if (strlen($countryCode) !== 2) {
        aln_json_error(422, "countryCode must be a 2-letter ISO code.");
    }

    return [
        "member" => $str("member"),
        "country" => $country,
        "countryCode" => $countryCode,
        "company" => $company,
        "url" => $str("url"),
        "email" => $str("email"),
        "phone" => $str("phone"),
        "logoUrl" => $nullableStr("logoUrl"),
        "imageUrl" => $nullableStr("imageUrl"),
    ];
}

$pdo = aln_db();
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    aln_require_user();

    $stmt = $pdo->query("SELECT * FROM network_members ORDER BY id ASC");
    $members = array_map("aln_row_to_member", $stmt->fetchAll());

    echo json_encode(["ok" => true, "members" => $members]);
    exit;
}

if ($method === "POST") {
    aln_require_admin();
    $input = aln_member_input();

    $stmt = $pdo->prepare(
        "INSERT INTO network_members (member, country, country_code, company, url, email, phone, logo_url, image_url)
         VALUES (:member, :country, :country_code, :company, :url, :email, :phone, :logo_url, :image_url)"
    );
    $stmt->execute([
        "member" => $input["member"],
        "country" => $input["country"],
        "country_code" => $input["countryCode"],
        "company" => $input["company"],
        "url" => $input["url"],
        "email" => $input["email"],
        "phone" => $input["phone"],
        "logo_url" => $input["logoUrl"],
        "image_url" => $input["imageUrl"],
    ]);

    $id = (int) $pdo->lastInsertId();
    echo json_encode(["ok" => true, "member" => array_merge(["id" => $id], $input)]);
    exit;
}

if ($method === "PUT") {
    aln_require_admin();

    $body = json_decode(file_get_contents("php://input"), true);
    $id = is_array($body) && isset($body["id"]) ? (int) $body["id"] : 0;
    if ($id <= 0) {
        aln_json_error(422, "A valid id is required.");
    }

    $input = aln_member_input();

    $stmt = $pdo->prepare(
        "UPDATE network_members
         SET member = :member, country = :country, country_code = :country_code, company = :company,
             url = :url, email = :email, phone = :phone, logo_url = :logo_url, image_url = :image_url
         WHERE id = :id"
    );
    $stmt->execute([
        "member" => $input["member"],
        "country" => $input["country"],
        "country_code" => $input["countryCode"],
        "company" => $input["company"],
        "url" => $input["url"],
        "email" => $input["email"],
        "phone" => $input["phone"],
        "logo_url" => $input["logoUrl"],
        "image_url" => $input["imageUrl"],
        "id" => $id,
    ]);

    if ($stmt->rowCount() === 0) {
        aln_json_error(404, "Member not found.");
    }

    echo json_encode(["ok" => true, "member" => array_merge(["id" => $id], $input)]);
    exit;
}

if ($method === "DELETE") {
    aln_require_admin();

    $body = json_decode(file_get_contents("php://input"), true);
    $id = is_array($body) && isset($body["id"]) ? (int) $body["id"] : 0;
    if ($id <= 0) {
        aln_json_error(422, "A valid id is required.");
    }

    $stmt = $pdo->prepare("DELETE FROM network_members WHERE id = :id");
    $stmt->execute(["id" => $id]);

    if ($stmt->rowCount() === 0) {
        aln_json_error(404, "Member not found.");
    }

    echo json_encode(["ok" => true]);
    exit;
}

aln_json_error(405, "Method not allowed");
