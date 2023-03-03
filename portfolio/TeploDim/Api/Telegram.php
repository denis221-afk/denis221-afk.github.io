<?php

/* https://api.telegram.org/bot6176757299:AAHkGVy70xnE12XJKSq9l03deIkDbnwZyCs/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['username'];
$email = $_POST['phone'];
$token = "6176757299:AAHkGVy70xnE12XJKSq9l03deIkDbnwZyCs";
$chat_id = "-1001308694383";
$arr = array(
  'Імя користувача: ' => $name,
  'телефон' => $email,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


