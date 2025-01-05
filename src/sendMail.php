<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS Preflight-Anfrage verarbeiten
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON-Payload einlesen
    $json = file_get_contents('php://input');
    $params = json_decode($json, true);

    if (!$params || !isset($params['email'], $params['name'], $params['message'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        exit;
    }

    $email = filter_var($params['email'], FILTER_SANITIZE_EMAIL);
    $name = htmlspecialchars($params['name']);
    $messageContent = htmlspecialchars($params['message']);

    $recipient = 'kontakt@peterpfautsch.de';
    $subject = "Contact From <$email>";
    $message = "From: $name <br> $messageContent";

    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: noreply@mywebsite.com'
    ];

    // E-Mail senden
    try {
        if (mail($recipient, $subject, $message, implode("\r\n", $headers))) {
            http_response_code(200);
            echo json_encode(['status' => 'success', 'message' => 'Email sent successfully!']);
        } else {
            throw new Exception('Email could not be sent.');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    // Nicht erlaubte Methoden
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
}
?>
