<?php
require_once 'db_connection.php';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SYSTEM_NAME; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo ASSETS_URL; ?>css/style.css">
</head>
<body>
<div class="container mt-4">
    <img src="<?php echo ASSETS_URL; ?>img/logo-mk.png" alt="Logo MK" class="img-fluid mx-auto d-block" style="max-width: 150px;">
    <h1 class="text-center"><?php echo SYSTEM_NAME; ?></h1>
</div>
