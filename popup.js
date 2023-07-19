// Grab the current Tab URL
async function getTab() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    let cleanUrl = tabs[0].url
    return cleanUrl.split('#')[0];
}

// Stats stuff
// let timesClicked = 0
// const statsArea = document.getElementById("stats")

// window.onload = function() {
//     chrome.storage.sync.get(['times_clicked'], function(result){
//         console.log(result.times_clicked)
//         timesClicked = result.times_clicked
//     });

//     // TODO: Button clicks aren't being loaded on window load
//     statsArea.innerHTML = timesClicked
//     console.log(`YO WTF: ${timesClicked}`)
// }

let cp2


// Listener to grab selected text from content-script.js
// Listener to grab selected text from content-script.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    cp2 = request.campaignsArray
    console.log(cp2)
    createCp2List(cp2)
}
)






let createCp2List = (campaigns) => {
    let campaignListHTML = ""
    
    campaigns.forEach(campaignID => {
        campaignListHTML += `
            <li><a href='https://ansys.lightning.force.com.mcas.ms/lightning/r/Campaign/${campaignID}/view' target="_blank">${campaignID}</a></li>
        `
    })
document.getElementById("CampaignID2Display").innerHTML = campaignListHTML;
    return campaignListHTML
}




// Function that opens current AEM page in Live site
function openInLive() {
    getTab().then(url => {
        console.log(url);
        let country = url.substr(83, 5);
        let intlPath = url.substr(82).replace('/home/', '/');
        let usPath = url.substr(82).replace('/en-us/home/', '/');

        if (country !== 'en-us') {
            window.open(`https://www.ansys.com${intlPath}`, '_blank')
        } else {
            window.open(`https://www.ansys.com${usPath}`, '_blank')
        }
    })
}

// Function that edits current live site tab in AEM
function editInAEM() {
    getTab().then(url => {
        let country = url.substr(22, 5); // Get country code
        let path = (url.substr(27)); // Get path after country code
        const countryCodes = ["en-us", "en-in", "en-gb", "fr-fr", "de-de", "it-it", "ja-jp", "ko-kr", "zh-cn", "zh-tw"];

        if (countryCodes.includes(country)) {
            window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${country}/home${path}.html`, "_blank")
        } else {
            window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/en-us/home/${url.substr(22)}.html`, '_blank');
        }
    })
}

// Function that opens current AEM page in all other international versions
function editIntl() {
    getTab().then(url => {
        let country = url.substr(83, 5);
        let path = (url.substr(89));
        const countryCodes = ["en-us", "en-in", "en-gb", "fr-fr", "de-de", "it-it", "ja-jp", "ko-kr", "zh-cn", "zh-tw"];

        for (let i = 0; i < countryCodes.length; i++) {
            if (country !== countryCodes[i]) {
                window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${countryCodes[i]}/${path}`, '_blank');
            }
        }
    })
}


// Function that opens Preview page in Editor
function editPreviewPage() {
    getTab().then(url => {
        window.open(url.replace('/content/', '/editor.html/content/').slice(0, -17), '_blank')
    })
}

// Function that opens current AEM in content tree
function openContentTree() {
    getTab().then(url => {
        window.open(url.replace('/editor.html/', '/sites.html/').slice(0, -5), '_blank');
    })
}


function slugify() {
    let input = document.getElementById("slugInput").value;
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')


    let slugifiedString = input.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text

    document.getElementById("slugLabel").innerHTML = slugifiedString;
}



// Listeners

openInLive1.addEventListener("click", async() => {
    openInLive();
});



editInAEM1.addEventListener("click", async() => {
    editInAEM();
});


editIntl1.addEventListener("click", async() => {
    editIntl();
});


openContentTree1.addEventListener("click", async() => {
    openContentTree();
});

slugifyBTN.addEventListener("click", async() => {
    slugify();
});

openEditorFromPreview1.addEventListener("click", async() => {
    editPreviewPage();
})