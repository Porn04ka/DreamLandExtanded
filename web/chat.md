- [Установка](#Установка)
- [Настройки](#Настройки)
    - [Общие](#Общие)
    - [Чат](#Чат)

# Установка
1. В игре нажмите на кнопку параметров
![btn-settings](img\settings-button.png)
2. Вставте нижепредставленный скрипт в появившееся окно в самом вверху
```js
function dreamLandWebExtand(){
    let chatView = true;
    let chatWithNpc = false;
    let chatParam = {
        'width': '20%',
        'height': '150px'
    }
    let language = {
        'npcSpeaks': 'произносит',
        'outRole': 'внероли',
        'tellsYou': 'говорит тебе'
    }

    function start(){
        if (chatView) {
            $('body').prepend('<div id="dle-modal-chat" style="position: absolute;top: 1px;right: 1px;z-index: 999;width: ' + chatParam['width'] + ';"> <button data-state="1" aria-hidden="true" class="btn btn-sm btn-outline-primary" style="position: absolute; top: 0px; right: 0px;" id="dle-btn-chat">  <i class="fa fa-minus" id="dle_btn_style"></i>  </button> <div id="dle-chat" style="background-color: #353535; border-radius: 0px 0px 0px 15px; height: ' + chatParam['height'] + '; overflow-y: scroll;"> <ul style="list-style-type:  none; margin-left: -25px" id="dle_ul"></ul> </div></div>')

            $(document).on('click', '#dle-btn-chat', function(e, text) {
                if ($(this).data('state') === 0) {
                    $('#dle-chat').fadeIn(400);         
                    $(this).data('state', 1);
                    $('#dle_btn_style').removeClass("fa-plus").addClass('fa-minus');
                } else {
                    $('#dle-chat').fadeOut(400);
                    $(this).data('state', 0);
                    $('#dle_btn_style').removeClass("fa-minus").addClass('fa-plus');
                }
                return false
            });
        }
    }

    function addLineChat(msg) {
        let result = msg.match(`^(.*) ${language['npcSpeaks']} '(.*)'`);
        if (result && chatWithNpc) {
            $('#dle_ul').append(`<li><span class="fgdg">${result[1]}> ${result[2]}</span></li>`)
            return
        }
        result = msg.match(`^\[${language['outRole']}\] (.*): '(.*)'`);
        if (result) {
            $('#dle_ul').append(`<li><span class="fgbr">${result[1]}> ${result[2]}</span></li>`)
            return
        }
        result = msg.match(`^(.*) ${language['tellsYou']} '(.*)'`);
        if (result) {
            $('#dle_ul').append(`<li><span class="fgbc">${result[1]}> ${result[2]}</span></li>`)
            return
        }
    }

    return {
        'addLineChat': addLineChat,
        'start': start,
    }
}

const dle = dreamLandWebExtand();
/*Настройки скрипта*/
dle.start();
```
3. В /*Настройки скрипта*/ можно указать настройки для расширения (ниже)
4. В блоке "Триггер" укажите **dle.addLineChat(text);**
![btn-settings](img\chat_addline.png)

# Настройки
## Общие
- **language** (object) - задает перевод. По умолчанию рус

## Чат
- **chatView** (bool) - Включение/Отключение чата. Значаение по умолчанию true
- **chatWithNpc** (bool) - Включение/Отключение показа сообщений NPC. Значаение по умолчанию false
- **chatParam** (object) - параметры отображения чата
    - **width** (css) - Значенеи по умолчанию 20%
    - **height** (css) - Значенеи по умолчанию 150px