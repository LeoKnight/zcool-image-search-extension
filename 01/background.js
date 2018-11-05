
function handleClick (info, tab){
  console.log(info,tab)
}

const searchBtn = chrome.contextMenus.create({
  "title": "通过海洛搜索图片", 
  "contexts":["image"],
  "onclick": handleClick});

