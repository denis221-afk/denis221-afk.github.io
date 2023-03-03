<?php

/* https://api.telegram.org/bot5325735448:AAFbn-C7mfIYJ7Jx4Ju-6BFH5aJ4GW--6Go/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['user_name'];
$email = $_POST['user_phone'];
$masenge = $_POST['user_text'];
$token = "5325735448:AAFbn-C7mfIYJ7Jx4Ju-6BFH5aJ4GW--6Go";
$chat_id = "-645371909";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон' => $email,
  'Повідомлиння: ' => $masenge
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


