<?php
/**
 * Handles the contact form at src/components/contact/contact-content.tsx.
 * Keep RECIPIENT_EMAIL in sync with `site.email` in src/lib/site.ts.
 */

declare(strict_types=1);

const RECIPIENT_EMAIL = "info@autologisticsnetwork.com";

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Method not allowed"]);
    exit;
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Invalid payload"]);
    exit;
}

// Strip header-breaking characters — every value below may end up in mail headers.
$fields = [];
foreach ($data as $key => $value) {
    if (is_string($value)) {
        $fields[$key] = trim(str_replace(["\r", "\n"], " ", $value));
    }
}

foreach (["name", "email", "subject", "message"] as $key) {
    if (empty($fields[$key])) {
        http_response_code(422);
        echo json_encode(["ok" => false, "error" => "Missing field: $key"]);
        exit;
    }
}

$email = $fields["email"];
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Invalid email"]);
    exit;
}

// The message body keeps its line breaks — only header-bound values are flattened.
$message = trim((string) ($data["message"] ?? ""));

$body = implode("\n", [
    "From",
    "  Name: {$fields['name']}",
    "  Email: {$email}",
    "",
    "Subject",
    "  {$fields['subject']}",
    "",
    "Message",
    $message,
]);

$subject = "Website contact - {$fields['subject']} - {$fields['name']}";

$host = preg_replace('/^www\./', '', $_SERVER["HTTP_HOST"] ?? "localhost");
$headers = [
    "From: ALN Website <no-reply@{$host}>",
    "Reply-To: {$email}",
    "Content-Type: text/plain; charset=utf-8",
];

$sent = mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(502);
    echo json_encode(["ok" => false, "error" => "Mail delivery failed"]);
    exit;
}

echo json_encode(["ok" => true]);
