<?php
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require "./PHPMailer/src/Exception.php";
require "./PHPMailer/src/PHPMailer.php";
require "./PHPMailer/src/SMTP.php";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validate form fields
    $full_name = trim($_POST["fullname"]);
    $email = trim($_POST["email"]);
    $messageReceived = trim($_POST["message"]);

    if (empty($full_name) || empty($email) || empty($messageReceived)) {
        echo 'Please complete all fields!';
        exit;
    }

    // Validate email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Invalid email address!';
        exit;
    }

    // Where to send the mail? It should be your email address
    $to = 'ronke@ronkealukomusic.com';
    
    // Mail subject
    $subject = "1 New Message From The Website (".$full_name.")";
    
    // Mail message
    $message_body = "Name: $full_name\n";
    $message_body .= "Email: $email\n\n";
    $message_body .= "Message:\n$messageReceived";
    
    // Mail headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

	
	//Create an instance; passing `true` enables exceptions
	$mail = new PHPMailer(true);

	try {
		//Server settings
		// $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
		$mail->isSMTP();                                            //Send using SMTP
		$mail->Host       = 'server259.web-hosting.com';                     //Set the SMTP server to send through
		$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
		$mail->Username   = 'ronke@ronkealukomusic.com';                     //SMTP username
		$mail->Password   = 'ronkealuko123$';                               //SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
		$mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

		//Recipients
		$mail->setFrom($email, $full_name);
		$mail->addAddress($to, 'Ronke Aluko');     //Add a recipient
		// $mail->addAddress('ellen@example.com');               //Name is optional
		$mail->addReplyTo($email, $full_name);
		// $mail->addCC('cc@example.com');
		// $mail->addBCC('bcc@example.com');

		//Attachments
		// $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
		// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

		//Content
		$mail->isHTML(true);                                  //Set email format to HTML
		$mail->Subject = $subject;
		$mail->Body    = '
        <!DOCTYPE html>
        <html>
        <body>
        <div>
        <b>Message from the website</b><br> 
        <b>Name</b>: '.$full_name.'<br>
        <b>Email</b>: '.$email.'<br>
        <b>Message</b>: '.$messageReceived.'
        </div>
        </body>
        </html>
        ';
		// $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

		$mail->send();
		echo json_encode(["success" => true]);
	} catch (Exception $e) {
		// echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        echo json_encode(["success" => false,"error"=>$mail->ErrorInfo]);
	}
}