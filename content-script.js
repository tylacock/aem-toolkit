const PAGE_URL = location.href;


/* -------------------------------------------------------------
Onload tweaks
-------------------------------------------------------------*/

// Adds button toolbar to editor page
const PRIMARY_TOOLBAR_LOCATION = document.getElementsByClassName('_coral-ActionBar-primary')[0];

PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<a id="openInLive1" class="btn-link">Open in Live</a>');
PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<a id="openContentTree1" class="btn-link">Open in Content Tree</a>');
PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<div class="dropdown"><button id="dropdown" class="dropbtn btn-link">Country</button><div class="dropdown-content" id="myDropdown"><a class="countryLink">OPEN ALL</a><a class="countryLink">EN-US</a><a class="countryLink">EN-GB</a><a class="countryLink">EN-IN</a><a class="countryLink">DE-DE</a><a class="countryLink">FR-FR</a><a class="countryLink">IT-IT</a><a class="countryLink">KO-KR</a><a class="countryLink">JA-JP</a><a class="countryLink">ZH-TW</a><a class="countryLink">ZH-CN</a></div></div>');

// Defaults editor toolbar to be on Content Tree instead of image viewer

/*
1. Select the content tree view (id="coral-id-772")
2. Add .is-selected to content tree view
3. Remove .is-selected class to Asset view tab id="coral-id-770"
*/

window.onload = function() {
    // const contentTreeTab = document.querySelector('#coral-id-772')
    // console.log(contentTreeTab)
    // const assetTab = document.querySelector('#coral-id-770')
    // console.log(assetTab)


    // contentTreeTab.classList.add("is-selected")
    // assetTab.classList.remove("is-selected")

    const testTab = document.getElementById("coral-id-772")
    console.log(`testTab =======> ${testTab}`)
    testTab.click();



}

/* -------------------------------------------------------------
Toolbar button functions
-------------------------------------------------------------*/

// Function that opens current AEM page in Live site
function openInLive() {
    let country = PAGE_URL.substr(83, 5);
    let intlPath = PAGE_URL.substr(82).replace('/home/', '/');
    let usPath = PAGE_URL.substr(82).replace('/en-us/home/', '/');

    if (country !== 'en-us') {
        window.open(`https://www.ansys.com${intlPath}`, '_blank')
    } else {
        window.open(`https://www.ansys.com${usPath}`, '_blank')
    }
}


// Function that opens current AEM page in all other international versions
function editIntl() {
    let country = PAGE_URL.substr(83, 5);
    let path = (PAGE_URL.substr(89));
    const countryCodes = ["en-us", "en-in", "en-gb", "fr-fr", "de-de", "it-it", "ja-jp", "ko-kr", "zh-cn", "zh-tw"];

    for (let i = 0; i < countryCodes.length; i++) {
        if (country !== countryCodes[i]) {
            window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${countryCodes[i]}/${path}`, '_blank');
        }
    }
}

// Function that opens current AEM in content tree
function openContentTree() {
    window.open(PAGE_URL.replace('/editor.html/', '/sites.html/').slice(0, -5), '_blank');
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
            let country = PAGE_URL.substr(83, 5);
            const countryCodes = ["en-us", "en-in", "en-gb", "fr-fr", "de-de", "it-it", "ja-jp", "ko-kr", "zh-cn", "zh-tw"];

            for (let i = 0; i < countryCodes.length; i++) {
                if (country !== countryCodes[i]) {
                    window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${countryCodes[i]}/${path}`, '_blank');
                }
            }
        } else {
            window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${countryId.toLowerCase()}/${path}`, '_blank');
        }

    }, true);
};



/* -------------------------------------------------------------
Listeners
-------------------------------------------------------------*/
openInLive1.addEventListener("click", async() => {
    openInLive();
});

openContentTree1.addEventListener("click", async() => {
    openContentTree();
});

dropdown.addEventListener("click", async() => {
    toggleDropdown();
});