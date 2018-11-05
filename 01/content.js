var prevDOM = null;

const MASK_CLASSNAME = 'crx_mask'
function getElementViewLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  if (document.compatMode == "BackCompat") {
    var elementScrollLeft = document.body.scrollLeft;
  } else {
    var elementScrollLeft = document.documentElement.scrollLeft;
  }

  return actualLeft - elementScrollLeft;
}

function getElementViewTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  if (document.compatMode == "BackCompat") {
    var elementScrollTop = document.body.scrollTop;
  } else {
    var elementScrollTop = document.documentElement.scrollTop;
  }

  return actualTop - elementScrollTop;
}

const mask = document.createElement('div')
mask.style.background = `url(${chrome.runtime.getURL('svg/icon.svg')})`
mask.classList.add('crx_mask')

mask.addEventListener('click',function(event){
  event.stopPropagation()
  console.log('111', prevDOM.src)
})

mask.addEventListener('mouseenter',function(event){
  mask.style.background = `url(${chrome.runtime.getURL('svg/icon_hover.svg')})`
})

mask.addEventListener('mouseleave',function(event){
  mask.style.background = `url(${chrome.runtime.getURL('svg/icon.svg')})`
  mask.style.display = 'none'
})


document.body.append(mask)

document.addEventListener('mousemove', function (e) {
  let { srcElement,target } = e
  if (prevDOM != srcElement && srcElement.nodeName == 'IMG') {

    if (prevDOM != null) {
      mask.style.display = 'none'
    }
    mask.style.display = 'block'

    prevDOM = srcElement;

    mask.style.left = getElementViewLeft(e.target) + 8 +'px'
    mask.style.top = e.target.getBoundingClientRect().top+document.documentElement.scrollTop + e.target.height - 40 + 'px'
  }
}, false);