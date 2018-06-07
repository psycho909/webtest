<?php
session_start();
$_SESSION['key'] = hash('sha256', time().'IWantToQuitMyJob.');
$response['status'] = 1;
$response['key'] = $_SESSION['key'];

echo json_encode($response);
exit();
?>