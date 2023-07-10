// ContextMenu listener
chrome.contextMenus.onClicked.addListener(genericOnClick);

// Alt Text click handler
function genericOnClick(info) {
    let chatGptURL = "https://chat.openai.com/"
    chrome.tabs.create({ url: chatGptURL })
}

// Create contextMenu items
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "AEM",
    contexts: ["page"],
    id: "MainParent"
  })

  chrome.contextMenus.create({
    title: "Generate Alt Text",
    contexts: ["page"],
    parentId: "MainParent",
    id: "altTextChild"
  })
});