<?php
// === Настройки ===
$token = "7216133699:AAFrkcmxI9ytcXvIYDkoKFgRQkmJAR9PwlQ";     // Токен бота
$chat_id = "2019801953";      // ID чата

// === Получение данных ===
$name = htmlspecialchars($_POST['name'] ?? 'Без имени');
$phone = htmlspecialchars($_POST['phone'] ?? 'Без телефона');
$cart = htmlspecialchars($_POST['cart'] ?? 'Корзина пуста');

// === Формируем сообщение ===
$message = "🛒 <b>Новый заказ!</b>\n\n"
         . "👤 <b>Имя:</b> $name\n"
         . "📞 <b>Телефон:</b> $phone\n"
         . "🧾 <b>Корзина:</b>\n$cart";

// === Отправка в Telegram ===
$url = "https://api.telegram.org/bot$token/sendMessage";
$params = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$response = file_get_contents($url . '?' . http_build_query($params));

// === Ответ пользователю ===
if ($response) {
  echo "✅ Заказ отправлен! Мы свяжемся с вами.";
} else {
  echo "❌ Ошибка отправки заказа.";
}
?>
