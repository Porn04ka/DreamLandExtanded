- [Установка](#Установка)
- [Настройки](#Настройки)
    - [Общие](#Общие)
    - [Чат](#Чат)

# Установка
1. В игре нажмите на кнопку параметров
![btn-settings](img/settings-button.png)
2. Вставте нижепредставленный скрипт в появившееся окно в самом вверху
```js
// Настройки
let mySettings = {
    'addButtonPanel': false
}

fetch("https://porn04ka.github.io/DreamLandExtanded/extended/ext.js")
    .then(response => response.text())  // Получаем текстовый контент скрипта
    .then(scriptContent => {
            // Выполняем полученный JavaScript код
        eval(scriptContent);
        console.info('Скрипт расширения был загружен, тыц');
    })
    .catch(error => {
        console.error('Ошибка загрузки скрипта =(:', error);
    });
```
3. В **НАСТРОЙКИ** можно указать настройки для расширения (описание ниже)
4. В блоке "Триггер" укажите **dle.addLineChat(text);**

![btn-settings](img/chat_addline.png)

# Настройки
## Общие
- **phrases** (array) - массив шаблонов поиска

## Чат
- **chatView** (bool) - Включение/Отключение чата. Значаение по умолчанию true
- **chatWithNpc** (bool) - Включение/Отключение показа сообщений NPC. Значаение по умолчанию false
- **chatParam** (object) - параметры отображения чата
    - **width** (css) - Значенеи по умолчанию 20%
    - **height** (css) - Значенеи по умолчанию 150px

## Дополнительная панель с кнопками действий
- **addButtonPanel** (bool) - Включение/Отключение панели. Значаение по умолчанию false
- **btnPannel** (string) - название панели
