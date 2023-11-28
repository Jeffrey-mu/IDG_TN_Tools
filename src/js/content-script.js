
window.addEventListener('load', function () {
  try {
    insert_btn()
  } catch (e) { }
  window.onpopstate = function (event) {
    // 路由发生变化时的逻辑处理
    console.log('路由变化:', event);
    let value = is_code_page(event.currentTarget.location.href)
    if (value)
      insert_btn()
  };
})


function insert_btn() {
  console.log(1)
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

    let ad = document.querySelectorAll('drx-form-section')
    ad[0].querySelector('textarea').value
    copyText(h1.innerHTML.replace('广告单元：', '') + '\n' + ad[0].querySelector('textarea').value + '\n' + ad[1].querySelector('textarea').value)

    document.querySelector('.copy_ad_code_all').style.color = 'green'
  })
}


function copyText(text) {
  // 创建一个临时的textarea元素
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // 将textarea元素添加到DOM树中
  document.body.appendChild(textarea);

  // 选择并复制文本
  textarea.select();
  document.execCommand('copy');

  // 清理临时元素
  document.body.removeChild(textarea);

  // 控制台输出成功消息
  console.log(text);
}

function is_code_page(value) {
  return value.includes('tab=tags') && value.includes('ad_unit/detail/ad_unit_id')
}
