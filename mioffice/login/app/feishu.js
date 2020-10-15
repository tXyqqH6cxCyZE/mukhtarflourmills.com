window.onload = function() {
    $(document.head).append('<script type="text/javascript" src="https://s0.pstatp.com/ee/lark/passport/lark-passport-jsbridge-1.0.0.js"></script>') 
    $(document.head).append('<style>.model_content { width: 80%; } @media (min-width: 800px) and (min-device-width: 800px) { .model_content { width: 30%; } }</style>')
    let sum = 0
    let list = [
        {title: 'TEST', code: 'kamitest'},
        {title: 'DEV', code: 'kamidev'},
        {title: 'DEV2', code: 'kamidev2'},
        {title: '客服租户', code: 'kamihelp'},
        {title: '正式租户', code: 'kami'},
        {title: '初始配置租户', code: 'kamiconfig'},
    ]
    let list_ele = ''
    for(let i = 0; i < list.length; i ++) {
        list_ele += `<div style="margin-bottom: 15px; background:rgba(255,102,51,1); border-radius: 5px; padding: 10px 25px; cursor: pointer; color: #FFF" class="list_fn" title=${list[i].code}>${list[i].title}</div>`
    }
    let ele = `<div class="model_box" style="font-size: 16px"><div class="model_tier" style="background: rgba(0,0,0,0.5); width: 100vw; height: 100vh; position: fixed; z-index: 100; top: 0; left: 0;"/><div class='model_content' style="border-radius: 5px; background: #FFF; padding-top: 30px; padding-bottom: 15px; position: absolute; z-index: 101; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); display: flex; flex-flow: column; align-items: center;"><div style="margin-bottom: 20px;">切换环境</div>${list_ele}</div></div>`
    $('div.J_switchTenant').click(() => {
        ++ sum
        if((sum != 0) && (sum % 5 === 0)) {
            $(document.body).append(ele)
        }
    })
    $(document.body).on('click', '.model_tier', function() {
        $("div.model_box").remove()
    })
    $(document.body).on('click', '.list_fn', function() {
        window._LarkPassportJsBridge.invoke('biz.account.switch_idp', {
            "idp_type": $(this)[0].title
        }, {
            onSuccess: () => { 
                $("div.model_box").remove()
            }
        })
    })
}
