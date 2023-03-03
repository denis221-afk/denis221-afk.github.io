<?php

/* https://api.telegram.org/bot5687766227:AAHErf_OlH_i-sNdYxwAlVKtZttIawJRPK8/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$email = $_POST['phone'];
$masenge = $_POST['masenge'];
$token = "5687766227:AAHErf_OlH_i-sNdYxwAlVKtZttIawJRPK8";
$chat_id = "-1001785565859";
$arr = array(
  'Імя користувача: ' => $name,
  'Номер телефону' => $email,
  'Повідомлиння: ' => $masenge
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


