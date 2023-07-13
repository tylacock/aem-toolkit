// ContextMenu listener



const DAM_PATH = "https://author-p16153-e39454.adobeaemcloud.com/mnt/overlay/dam/gui/content/assets/metadataeditor.external.html?item="

let SELECTED_TEXT = ""

// Listener to grab selected text from content-script.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    SELECTED_TEXT = request.text
  }
);


// Listener for tabs
chrome.contextMenus.onClicked.addListener((info, tab) => {

  switch (true) {
    case info.menuItemId.startsWith("alt"):
      let chatGptURL = "https://chat.openai.com/"
      chrome.tabs.create({ url: chatGptURL })
      break
    case info.menuItemId.startsWith("openImg"):
      let imgPath = DAM_PATH + SELECTED_TEXT
      chrome.tabs.create({ url: imgPath })
      break
    default:
      // Default case if none of the conditions match
      break
  }

})



// Create contextMenu items

  chrome.contextMenus.create({
    title: "AEM",
    contexts: ["all"],
    id: "MainParent"
  })

  chrome.contextMenus.create({
    title: "Generate Alt Text",
    contexts: ["all"],
    parentId: "MainParent",
    id: "altTextChild"
  })

  chrome.contextMenus.create({
    title: "Open Image in DAM",
    contexts: ["all"],
    parentId: "MainParent",
    id: "openImgDam"
  })
