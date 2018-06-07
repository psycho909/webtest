<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if($_SESSION['key'] != $_POST['key'] || $_SESSION['key'] == '') {
	$response['status'] = -3;
	echo json_encode($response);
	exit();
}
else {
	unset($_SESSION['key']);
}

if($_POST['contact'] == '' || !filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)) {
	$response['status'] = -1;
	echo json_encode($response);
	exit();
}

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'hwsmtp.exmail.qq.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'info@vdarts.tw';                 // SMTP username
    $mail->Password = 'VDarts123456';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('info@vdarts.tw');
    $mail->addAddress('info@vdarts.tw');               // Name is optional
    $mail->addReplyTo($_POST['mail'], $_POST['contact']);

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $_POST['contact'];
    $mail->Body = nl2br($_POST['info']);
    $mail->AltBody = $_POST['info'];

    $mail->send();
	if($_POST['contact'] != '' && filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)) {
		$response['status'] = 1;
		echo json_encode($response);
		exit();
	}
} catch (Exception $e) {
	print_r($e);
	$response['status'] = -2;
	echo json_encode($response);
	exit();
}
?>