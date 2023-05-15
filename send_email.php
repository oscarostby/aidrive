<?php
// Replace this email with your own
$recipient_email = "kookoobanan@gmail.com";

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . $email . "\r\n";

$subject = "New contact form submission";

$body = "<p><strong>Name:</strong> " . $name . "</p>";
$body .= "<p><strong>Email:</strong> " . $email . "</p>";
$body .= "<p><strong>Message:</strong><br>" . nl2br($message) . "</p>";

if (mail($recipient_email, $subject, $body, $headers)) {
    header("Location: ./index.html?status=success");
} else {
    header("Location: ./index.html?status=error");
}
?>
