// Grab the current Tab URL
async function getTab() {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].url;
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

// Function that opens current AEM in content tree
function openContentTree() {
    getTab().then(url => {
        window.open(url.replace('/editor.html/', '/sites.html/').slice(0, -5), '_blank');
    })
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