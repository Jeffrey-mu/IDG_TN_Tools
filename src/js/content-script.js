window.addEventListener('load', function() {
    try {
        if (isWork()) {
            callFun(init)
        }
    } catch (e) {}
    window.onpopstate = function(event) {
        // 路由发生变化时的逻辑处理
        // let value = is_code_page(event.currentTarget.location.href)
        if (isWork()) {
            callFun(init)
        }
    }
})


function insert_btn() {
    let h1 = document.querySelector('.title-container h1')
    let btn = document.createElement('div')
    btn.classList.add('copy_ad_code_all')
    btn.innerHTML = '复制全部广告代码'
    btn.style.cursor = 'pointer'
    if (!document.querySelector('.copy_ad_code_all')) {
        h1.parentElement.appendChild(btn)
    } else {
        document.querySelector('.copy_ad_code_all').style.color = '#111'
    }
    btn.addEventListener('click', () => {

        let ad = [...document.querySelectorAll('drx-form-section')]
        copyText('<!--' + h1.innerHTML.replace('广告单元：', '') + '-->' + '\n' + ad.map(item => item.querySelector('textarea').value + '\n').join(''))

        document.querySelector('.copy_ad_code_all').style.color = 'green'
    })
}

function init() {
    loadCustomFonts()
    appendElement()
}

function copyText(text) {
    // 创建一个临时的textarea元素
    const textarea = document.createElement('textarea')
    textarea.value = text

    // 将textarea元素添加到DOM树中
    document.body.appendChild(textarea)

    // 选择并复制文本
    textarea.select()
    document.execCommand('copy')

    // 清理临时元素
    document.body.removeChild(textarea)

    // 控制台输出成功消息
    console.log(text)
}

function is_code_page(value) {
    return value.includes('tab=tags') && value.includes('ad_unit/detail/ad_unit_id')
}

function isWork() {
    const hostWhiteList = ['admanager.google.com']
    return hostWhiteList.includes(location.host)
}

function callFun(fn) {
    if (!typeof fn == 'function') return
    try {
        fn()
    } catch (e) {
        console.log(e)
    }
}

function loadCustomFonts() {
    injectOnlineStyles("https://at.alicdn.com/t/c/font_4410865_9eydh1iqr4g.css")
}

function injectOnlineStyles(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    document.head.appendChild(link)
}

function appendElement() {
    const id = 'IDG_TN_Tools'
    let html = `
    <a class="floating-btn iconfont icon-Tools" title="单击复制详情代码，双击复制首页代码。">
    </a>
    <menu class="items-wrapper">
    ${getPosition().map(item => `<div data-value='${item.id}' title="${item.name}" class="${id}-menu-item menu-item">${item.name}</div>`).join('')}
    </menu>
    `
  if ($('#' + id).length) return
  let el = document.createElement('div')
  el.id = id
  el.classList.add('circular-menu')
  el.innerHTML = html
  document.body.appendChild(el)
  // 使用示例：使元素 ID 为 "draggableElement" 的元素可拖动
  makeElementDraggable(id)
  $('#' + id + ' .floating-btn').click(function () {
    document.getElementById('IDG_TN_Tools').classList.toggle('active')
  })
  const menu_btn_class_name = `.${id}-menu-item`
  $(menu_btn_class_name).click(function () {
    copy_adv_code('dp_' + this.dataset.value, $(this)[0].innerHTML)
    $(menu_btn_class_name).removeClass('active-menu-item_hp')
    $(menu_btn_class_name).removeClass('active-menu-item_dp')
    $(this).addClass('active-menu-item_dp')
  })

  $(menu_btn_class_name).contextmenu(function (e) {
    e.preventDefault()
    copy_adv_code('hp_' + this.dataset.value, $(this)[0].innerHTML)
    $(menu_btn_class_name).removeClass('active-menu-item_hp')
    $(menu_btn_class_name).removeClass('active-menu-item_dp')
    $(this).addClass('active-menu-item_hp')

  })
}
function copy_adv_code(id, code_name) {
  let h1 = document.querySelector('.title-container h1')
  let ad = [...document.querySelectorAll('drx-form-section')]
  copyText(h1.innerHTML.replace('广告单元：', '') + ' ' + id + '\n' + ad.map(item => item.querySelector('textarea').value + '\n').join(''))
  iziToast.show({
    title: '消息',
    message: `已成功复制${id.startsWith('hp_') ? '首页' : '详情'}${code_name}广告代码！`,
    position: 'topRight',
    color: 'green', // blue, red, green, yellow
  })
}
function makeElementDraggable(elementId) {
  const element = document.getElementById(elementId)

  if (!element) {
    console.error(`Element with ID ${elementId} not found.`)
    return
  }

  let offsetX, offsetY, isDragging = false

  // 鼠标按下时的处理函数
  function handleMouseDown(e) {
    isDragging = true
    offsetX = e.clientX - element.getBoundingClientRect().left
    offsetY = e.clientY - element.getBoundingClientRect().top
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // 鼠标移动时的处理函数
  function handleMouseMove(e) {
    if (!e.target.className.includes('floating-btn')) return
    if (isDragging) {
      const newX = e.clientX - offsetX
      const newY = e.clientY - offsetY

      element.style.left = `${newX}px`
      element.style.top = `${newY}px`
    }
  }

  // 鼠标松开时的处理函数
  function handleMouseUp() {
    isDragging = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  // 绑定mousedown事件，开始拖动
  element.addEventListener('mousedown', handleMouseDown)
}

function getPosition() {
  return [{
    "id": 2,
    "name": "首屏"
  },
  {
    "id": 3,
    "name": "二屏"
  },
  {
    "id": 4,
    "name": "底部悬浮"
  },
  {
    "id": 5,
    "name": "页面底部"
  },
  {
    "id": 6,
    "name": "检测"
  },
  {
    "id": 7,
    "name": "激励"
  },
  {
    "id": 8,
    "name": "特殊id头部悬浮"
  },
  {
    "id": 9,
    "name": "文章广告"
  },
  {
    "id": 10,
    "name": "顶部悬浮"
  },
  {
    "id": 11,
    "name": "pc_右侧"
  },
  {
    "id": 12,
    "name": "首页列表"
  }
  ]
}