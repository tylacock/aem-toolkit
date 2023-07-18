const DAM_PATH = "https://author-p16153-e39454.adobeaemcloud.com/mnt/overlay/dam/gui/content/assets/metadataeditor.external.html?item="
const XF_PATH = "https://author-p16153-e39454.adobeaemcloud.com/editor.html"
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
      // chrome.tabs.create({ url: chatGptURL })
      // fetch('http://localhost:3000/api/generate?imageUrl=https://images.ansys.com/is/image/ansys/stk-space-systems', {
      //   mode: 'no-cors',
      //   headers: {
      //     'Accept': 'application/json',
      //   },
      // })
      // .then(response => {
      //   console.log('Response status:', response.status);
      //   return response.json();
      // })
      // .then(response => console.log(JSON.stringify(response)))
      // .catch(error => console.error('Error:', error));
      break
    case info.menuItemId.startsWith("openImg"):
      let imgPath = DAM_PATH + SELECTED_TEXT
      chrome.tabs.create({ url: imgPath })
      break
    case info.menuItemId.startsWith("openXF"):
      let xfPath = XF_PATH + SELECTED_TEXT + ".html"
      chrome.tabs.create({url: xfPath})
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
    id: "altTextChild",
    enabled: false
  })

  chrome.contextMenus.create({
    title: "Open Image in DAM",
    contexts: ["all"],
    parentId: "MainParent",
    id: "openImgDam"
  })

  chrome.contextMenus.create({
    title: "Open XF",
    contexts: ["all"],
    parentId: "MainParent",
    id: "openXF"
  })