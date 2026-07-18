<?php
/**
 * Handles the quote form at src/components/quote/quote-form.tsx.
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

$required = [
    "startCountry", "endCountry", "startCity", "endCity",
    "vehicleType", "model", "year", "quantity",
    "fuelType", "condition", "transportMode", "doorToDoor", "marineInsurance",
    "companyName", "companyLocation", "contactPerson", "contactNo", "companyEmail",
];

foreach ($required as $key) {
    if (empty($fields[$key])) {
        http_response_code(422);
        echo json_encode(["ok" => false, "error" => "Missing field: $key"]);
        exit;
    }
}

$companyEmail = $fields["companyEmail"];
if (!filter_var($companyEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "Invalid email"]);
    exit;
}

$get = fn(string $key): string => $fields[$key] ?? "";

$lines = [
    "Route",
    "  From: {$fields['startCity']}, {$fields['startCountry']}",
    "  To:   {$fields['endCity']}, {$fields['endCountry']}",
    "",
    "Vehicle",
    "  Type: {$fields['vehicleType']}",
    "  Model: {$fields['model']}",
    "  Year: {$fields['year']}",
    "  Quantity: {$fields['quantity']}",
    "  Fuel type: {$fields['fuelType']}",
    "  Condition: {$fields['condition']}",
    "  Transport mode: {$fields['transportMode']}",
    "  Dimensions (L/W/H/Weight): {$get('length')} / {$get('width')} / {$get('height')} / {$get('weight')}",
    "  Door to door: {$fields['doorToDoor']}",
];

if ($fields["doorToDoor"] === "Yes") {
    $lines[] = "  Pickup address: {$get('pickupAddress')}";
    $lines[] = "  Delivery address: {$get('deliveryAddress')}";
}

$lines[] = "  Marine insurance: {$fields['marineInsurance']}";

if ($fields["marineInsurance"] === "Yes") {
    $lines[] = "  Vehicle value (USD): {$get('insuranceValue')}";
}

$lines[] = "";
$lines[] = "Remarks";
$lines[] = "  " . ($get("remarks") !== "" ? $get("remarks") : "-");
$lines[] = "";
$lines[] = "Company";
$lines[] = "  Name: {$fields['companyName']}";
$lines[] = "  Location: {$fields['companyLocation']}";
$lines[] = "  Contact: {$fields['contactPerson']}";
$lines[] = "  Phone: {$fields['contactNo']}";
$lines[] = "  Email: {$companyEmail}";

$body = implode("\n", $lines);
$subject = "New freight quote request - {$fields['companyName']}";

$host = preg_replace('/^www\./', '', $_SERVER["HTTP_HOST"] ?? "localhost");
$headers = [
    "From: ALN Website <no-reply@{$host}>",
    "Reply-To: {$companyEmail}",
    "Content-Type: text/plain; charset=utf-8",
];

$sent = mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(502);
    echo json_encode(["ok" => false, "error" => "Mail delivery failed"]);
    exit;
}

echo json_encode(["ok" => true]);
