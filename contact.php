<?php
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require "./PHPMailer/src/Exception.php";
require "./PHPMailer/src/PHPMailer.php";
require "./PHPMailer/src/SMTP.php";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    
    // Get the raw POST data
    $rawPostData = file_get_contents('php://input');
    $postData = json_decode($rawPostData,true);

    // Validate form fields
    $full_name = trim($postData["fullname"]);
    $email = trim($postData["email"]);
    $messageReceived = trim($postData["message"]);

    if (empty($full_name) || empty($email) || empty($messageReceived)) {
        echo json_encode(["success" => false, "errorM" => "Please complete all fields!"]);
        exit;
    }
    
    // Validate email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "errorM" => "Invalid email address!"]);
        exit;
    }

    // Where to send the mail? It should be your email address
    $to = 'ronke@ronkealukomusic.com';
    
    // Mail subject
    $subject = "1 New Message From The Website (" . htmlspecialchars($full_name) . ")";
    
    // Mail message
    $message_body = "Name: " . htmlspecialchars($full_name) . "\n";
    $message_body .= "Email: " . htmlspecialchars($email) . "\n\n";
    $message_body .= "Message:\n" . htmlspecialchars($messageReceived);
    
    // Mail headers
    $headers = "From: " . htmlspecialchars($email) . "\r\n";
    $headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        // Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'server259.web-hosting.com';             // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'ronke@ronkealukomusic.com';                // SMTP username from environment variables
        $mail->Password   = 'ronkealuko123$';                // SMTP password from environment variables
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Enable implicit TLS encryption
        $mail->Port       = 465;                                    // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        // Recipients
        $mail->setFrom('ronke@ronkealukomusic.com', 'Website Contact Form');
        $mail->addAddress($to, 'Ronke Aluko');     // Add a recipient
        $mail->addReplyTo($email, $full_name);

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = '
        <!DOCTYPE html>
        <html>
        <body>
        <div>
        <b>Message from the website</b><br> 
        <b>Name</b>: ' . htmlspecialchars($full_name) . '<br>
        <b>Email</b>: ' . htmlspecialchars($email) . '<br>
        <b>Message</b>: ' . htmlspecialchars($messageReceived) . '
        </div>
        </body>
        </html>
        ';

        $mail->send();
        echo json_encode(["success" => true]);
        exit;
    } catch (Exception $e) {
        echo json_encode(["success" => false, "errorM" => "Message could not be sent. Mailer Error: " . $mail->ErrorInfo]);
        exit;
    }
}
?>
