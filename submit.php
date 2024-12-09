<?php
// Allow CORS
header('Access-Control-Allow-Origin: *'); // Replace * with your domain for security
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['success' => false, 'error' => ''];

    // Sanitize and validate inputs
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Validate inputs
    if (!$name || !$email || !$phone || !$subject || !$message) {
        $response['error'] = 'All fields are required.';
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['error'] = 'Invalid email address.';
        echo json_encode($response);
        exit;
    }

    if (preg_match('/(http|www|href|<a)/i', $message)) {
        $response['error'] = 'Spam content detected in the message.';
        echo json_encode($response);
        exit;
    }

    // Email template
    $to = 'info@newslimited.org'; // Replace with your recipient email
    $subject = "Contact Form: $subject";

    $emailMessage = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
            }
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .header {
                text-align: center;
                background-color: #007bff;
                color: white;
                padding: 20px 10px;
                border-radius: 8px 8px 0 0;
            }
            .content {
                margin: 20px 0;
            }
            .content h4 {
                color: #007bff;
                margin-bottom: 10px;
            }
            .footer {
                text-align: center;
                padding: 10px;
                background-color: #f1f1f1;
                border-radius: 0 0 8px 8px;
                font-size: 12px;
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>
                <h1>Contact Form Submission</h1>
            </div>
            <div class='content'>
                <h4>Contact Details</h4>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Phone:</strong> $phone</p>
                <h4>Message</h4>
                <p>$message</p>
            </div>
            <div class='footer'>
                <p>Thank you for contacting us. We will respond to your message as soon as possible.</p>
                <p>&copy; " . date('Y') . " New Engineering Works and Supply Limited. All Rights Reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";

    // Send the email
    if (mail($to, $subject, $emailMessage, $headers)) {
        $response['success'] = true;
    } else {
        $response['error'] = 'Failed to send the email. Please try again later.';
    }

    // Return JSON response
    echo json_encode($response);
    exit;
}
