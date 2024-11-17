function dreamLandWebExtand(){
    /*НАСТРОЙКИ*/
    let settings = {
        'chatView':     true,
        'chatWithNpc':  false,
        'addButtonPanel': false,
        'chatParam': {
            'width':    '20%',
            'height':   '150px'
            },
        'phrases': [
            // Template                  Class
            ["^(.*) произносит '(.*)'", 'fgdg'],
            ["^\[внероли\] (.*): '(.*)'", 'fgdr'],
            ["^(.*) говорит тебе '(.*)'", 'fgbc']
        ],
        'btnCommand': [
            // Command                Description
            ['осмотреть', 'Осмотреть'],
        ],
        'btnPannel': 'Выполнить'
    }

    function setSettings(objSettings) {
        if (typeog(objSettings) != 'object') return;
        for (let key in objSettings){
            if (key in settings){
                settings[key] = objSettings[key];
                console.log(objSettings[key], settings[key]);
            }
        }
    }

    function start(){
        if (settings.chatView) {
            $('body').prepend('<div id="dle-modal-chat" style="position: absolute;top: 1px;right: 1px;z-index: 999;width: ' + settings.chatParam.width + ';"> <button data-state="1" aria-hidden="true" class="btn btn-sm btn-outline-primary" style="position: absolute; top: 0px; right: 0px;" id="dle-btn-chat">  <i class="fa fa-minus" id="dle_btn_style"></i>  </button> <div id="dle-chat" style="background-color: #353535; border-radius: 0px 0px 0px 15px; height: ' + settings.chatParam.height + '; overflow-y: scroll;"> <ul style="list-style-type:  none; margin-left: -25px" id="dle_ul"></ul> </div></div>')

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

            $(document).on('click', '.dle-Answer', function(e, text) {
                let p1 = $(this).data('type');
                let p2 = $(this).data('speaker');
                $('#inputBox').val(`${p1} ${p2}`);
            })
        }

        if (settings.addButtonPanel && settings.btnCommand.length  > 0 ) {   
            let lPanel = '';
            let rPanel = '';
            let fLPanel = true;
            settings.btnCommand.forEach((item) => {
                if (fLPanel){
                    lPanel = `${lPanel}<button type="button" class="btn btn-ctrl-panel" data-action="${item[0]}">${item[1]}</button>`
                    fLPanel = false;
                } else {
                    rPanel = `${rPanel}<button type="button" class="btn btn-ctrl-panel" data-action="${item[0]}">${item[1]}</button>`
                    fLPanel = true
                }                
            });
            $('#panel-wrap').prepend(`<div class="table-wrapper"><span class="dark-panel-title">${btnPannel}</span><button class="close false" type="button"></button><div class="MuiCollapse-root MuiCollapse-entered" tyle="min-height: 0px;"><div class="MuiCollapse-wrapper"><div class="MuiCollapse-wrapperInner"><div id="commands-table" class="flexcontainer-row collapse show"><div class="flexcontainer-column">${lPanel}</div><div class="flexcontainer-column">${rPanel}</div></div></div></div></div></div>`);
        }
    }

    function addLineChat(msg) {
        if (msg.length < 4) return;

        settings.phrases.forEach((item) => {
            let result = msg.match(item[0]);
            if (result) {
                $('#dle_ul').append(`<li><span class="${item[1]}">${result[1]}</span> &gt; ${result[2]}</li>`)
                document.getElementById('dle-chat').scrollTop = document.getElementById('dle-chat').scrollHeight;
                return
            }
        })
    }

    return {
        'addLineChat': addLineChat,
        'start': start,
        'setSettings': setSettings,
    }
}

const dle = dreamLandWebExtand();
dle.setSettings(mySettings)
dle.start();