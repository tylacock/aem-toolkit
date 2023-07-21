// Gets Current Tab URL
const PAGE_URL = location.href;
const PATH_NAME = location.pathname
const COUNTRY_CODE = PAGE_URL.substr(83, 5);
const COUNTRY_CODES_LIST = ["en-us", "en-in", "en-gb", "fr-fr", "de-de", "it-it", "ja-jp", "ko-kr", "zh-cn", "zh-tw"];


/* -------------------------------------------------------------
Utility Functions
-------------------------------------------------------------*/
// returns true if current page is an XF page
const isXF = () => {
    if (PATH_NAME.startsWith('/editor.html/content/experience-fragments/ansysincprogram')) {
        return true
    } else {
        return false
    }
}



/* -------------------------------------------------------------
Onload tweaks
-------------------------------------------------------------*/


// Adds button toolbar to editor pages only 
if (PAGE_URL.startsWith('https://author-p16153-e39454.adobeaemcloud.com/editor.html/')) {
    const PRIMARY_TOOLBAR_LOCATION = document.getElementsByClassName('_coral-ActionBar-primary')[0];

    // Do not create and Open in Live button if the page is an XF
    if (!isXF()) {
        PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<a id="openInLive1" class="btn-link">Open in Live</a>');
        PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<div class="countrySelectDropdown"><button id="dropdown" class="dropbtn btn-link">Country</button><div class="dropdown-content" id="myDropdown"><a class="countryLink">OPEN ALL</a><a class="countryLink">EN-US</a><a class="countryLink">EN-GB</a><a class="countryLink">EN-IN</a><a class="countryLink">DE-DE</a><a class="countryLink">FR-FR</a><a class="countryLink">IT-IT</a><a class="countryLink">KO-KR</a><a class="countryLink">JA-JP</a><a class="countryLink">ZH-TW</a><a class="countryLink">ZH-CN</a></div></div>');

        openInLive1.addEventListener("click", async() => {
            openInLive();
        });
        dropdown.addEventListener("click", async() => {
            toggleDropdown();
        });
    }

    // Create Seperate country toolbar button for XFs
    if (isXF()) {
        PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<div class="XFcountrySelectDropdown"><button id="dropdown" class="dropbtn btn-link">Country</button><div class="dropdown-content" id="XFmyDropdown"><a class="XFcountryLink">OPEN ALL</a><a class="XFcountryLink">EN-US</a><a class="XFcountryLink">EN-GB</a><a class="XFcountryLink">EN-IN</a><a class="XFcountryLink">DE-DE</a><a class="XFcountryLink">FR-FR</a><a class="XFcountryLink">IT-IT</a><a class="XFcountryLink">KO-KR</a><a class="XFcountryLink">JA-JP</a><a class="XFcountryLink">ZH-TW</a><a class="XFcountryLink">ZH-CN</a></div></div>');
        dropdown.addEventListener("click", async() => {
            xfToggleDropdown();
        });
    }
    
    PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<a id="openContentTree1" class="btn-link">Open in Content Tree</a>');
    
    openContentTree1.addEventListener("click", async() => {
        openContentTree();
    });
    
    
}





window.onload = (event) => {
    // Get campaignID2 ids and pass them to popup.js
    let allCampaignIDsArray = Array.from(document.querySelectorAll('[id^="campaignID2-"]'))
    const values = allCampaignIDsArray.map(value => {
        return value.value
    })
    console.log(values)

    setTimeout(() => {
        const response = chrome.runtime.sendMessage({campaignsArray: values});
    console.log(response);
      }, "2000");
    
}


/* -------------------------------------------------------------
Toolbar button functions
-------------------------------------------------------------*/

// Function that opens current AEM page in Live site
function openInLive() {
    let intlPath = PAGE_URL.substr(82).replace('/home/', '/');
    let usPath = PAGE_URL.substr(82).replace('/en-us/home/', '/');

    if (COUNTRY_CODE !== 'en-us') {
        window.open(`https://www.ansys.com${intlPath}`, '_blank')
    } else {
        window.open(`https://www.ansys.com${usPath}`, '_blank')
    }
}

// Function that opens current AEM page in all other international versions
function editIntl() {
    let path = (PAGE_URL.substr(89));

    for (let i = 0; i < COUNTRY_CODES_LIST.length; i++) {
        if (COUNTRY_CODE !== COUNTRY_CODES_LIST[i]) {
            window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${COUNTRY_CODES_LIST[i]}/${path}`, '_blank');
        }
    }
}

// Function that opens current AEM in content tree
function openContentTree() {

    // Checks if page is an XF or regular page
    if (PATH_NAME.startsWith('/editor.html/content/experience-fragments/ansysincprogram')) {
        window.open(PAGE_URL.replace('/editor.html/', '/aem/experience-fragments.html/').slice(0, -5), '_blank');
    } else {
        window.open(PAGE_URL.replace('/editor.html/', '/sites.html/').slice(0, -5), '_blank');
    }
}

// helper function to toggle the country dropwdown
function toggleDropdown() {
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    document.getElementById("myDropdown").classList.toggle("show");

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(e) {
        if (!e.target.matches('.dropbtn')) {
            var myDropdown = document.getElementById("myDropdown");
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }
}

// Opens AEM page in corresponding country page.
let countryButton = document.getElementsByClassName("countryLink");
for (var i = 0, length = countryButton.length; i < length; i++) {
    var anchor = countryButton[i];
    anchor.addEventListener('click', function() {
        // `this` refers to the anchor tag that's been clicked
        let path = (PAGE_URL.substr(89));
        let countryId = this.innerText;

        if (countryId === "OPEN ALL") {
            for (let i = 0; i < COUNTRY_CODES_LIST.length; i++) {
                if (COUNTRY_CODE !== COUNTRY_CODES_LIST[i]) {
                    window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${COUNTRY_CODES_LIST[i]}/${path}`, '_blank');
                }
            }
        } else {
            window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${countryId.toLowerCase()}/${path}`, '_blank');
        }

    }, true);
};




// helper function to toggle the country dropwdown in XF pages
function xfToggleDropdown() {
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    document.getElementById("XFmyDropdown").classList.toggle("show");

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(e) {
        if (!e.target.matches('.dropbtn')) {
            var XFmyDropdown = document.getElementById("XFmyDropdown");
            if (XFmyDropdown.classList.contains('show')) {
                XFmyDropdown.classList.remove('show');
            }
        }
    }
}


// Opens AEM page in corresponding country page.
let XFcountryButton = document.getElementsByClassName("XFcountryLink");
for (var i = 0, length = XFcountryButton.length; i < length; i++) {
    var anchor = XFcountryButton[i];
    anchor.addEventListener('click', function() {
        // `this` refers to the anchor tag that's been clicked
        let xfpath = (PAGE_URL.substr(109));
        let countryId = this.innerText;

        if (countryId === "OPEN ALL") {
            for (let i = 0; i < COUNTRY_CODES_LIST.length; i++) {
                if (COUNTRY_CODE !== COUNTRY_CODES_LIST[i]) {
                    window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/experience-fragments/ansysincprogram/${COUNTRY_CODES_LIST[i]}${xfpath}`, '_blank');
                }
            }
        } else {
            window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/experience-fragments/ansysincprogram/${countryId.toLowerCase()}/${xfpath}`, '_blank');
        }

    }, true);
};





// GOOD
// https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/experience-fragments/ansysincprogram/en-us/site/release-webinars/safety/2023-r2.html

// bad
// https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/en-gb/nsysincprogram/en-us/site/release-webinars/safety/2023-r2.html

// edito
// https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/experience-fragments/ansysincprogram/en-us/site/release-webinars/safety/2023-r2.html


/* -------------------------------------------------------------
Helpers
-------------------------------------------------------------*/



/* -------------------------------------------------------------
Listeners
-------------------------------------------------------------*/


// Listens for text selection then sends selection to background.js
document.addEventListener("selectionchange", () => {
    let selectedText = document.getSelection().toString()
    const response = chrome.runtime.sendMessage({text: selectedText});
  });
