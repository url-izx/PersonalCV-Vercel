<?php
/**
 * Contact Form API Handler
 * Student: Earl Laurence R. Masana
 * Course: BSIT 4th Year - Davao del Norte State College
 * 
 * Handles contact form POST submissions, sanitization, validation,
 * and JSON responses for local PHP/XAMPP environments.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Please submit via POST.'
    ]);
    exit;
}

// Read JSON or POST body
$input = json_decode(file_get_contents('php://input'), true);

$name = isset($input['name']) ? trim($input['name']) : (isset($_POST['name']) ? trim($_POST['name']) : '');
$email = isset($input['email']) ? trim($input['email']) : (isset($_POST['email']) ? trim($_POST['email']) : '');
$subject = isset($input['subject']) ? trim($input['subject']) : (isset($_POST['subject']) ? trim($_POST['subject']) : 'CV Website Inquiry');
$message = isset($input['message']) ? trim($input['message']) : (isset($_POST['message']) ? trim($_POST['message']) : '');

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Full name is required.';
} elseif (strlen($name) < 2) {
    $errors[] = 'Full name must be at least 2 characters.';
}

if (empty($email)) {
    $errors[] = 'Email address is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
}

if (empty($message)) {
    $errors[] = 'Message cannot be empty.';
} elseif (strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters long.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => implode(' ', $errors),
        'errors' => $errors
    ]);
    exit;
}

// Sanitize inputs
$safe_name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safe_email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safe_subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$safe_message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Optional log storage to text file for testing
$log_dir = __DIR__ . '/../data';
if (!is_dir($log_dir)) {
    @mkdir($log_dir, 0755, true);
}
$log_entry = date('[Y-m-d H:i:s]') . " From: {$safe_name} ({$safe_email}) | Subject: {$safe_subject} | Message: {$safe_message}\n";
@file_put_contents($log_dir . '/messages.log', $log_entry, FILE_APPEND);

// Success Response
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'Thank you, ' . $safe_name . '! Your message has been received successfully.',
    'data' => [
        'name' => $safe_name,
        'email' => $safe_email,
        'subject' => $safe_subject,
        'timestamp' => date('c')
    ]
]);
