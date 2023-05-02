// Gets Current Tab URL
const PAGE_URL = location.href;
const COUNTRY_CODE = PAGE_URL.substr(83, 5);
const COUNTRY_CODES_LIST = ["en-us", "en-in", "en-gb", "fr-fr", "de-de", "it-it", "ja-jp", "ko-kr", "zh-cn", "zh-tw"];



 // Adds button toolbar to editor page
 let rootElement = document.querySelector('#Content')
 let PRIMARY_TOOLBAR_LOCATION = rootElement.querySelector('._coral-ActionBar-primary')
 console.log(`TOOLBAR: ${PRIMARY_TOOLBAR_LOCATION}`)

/* -------------------------------------------------------------
Onload tweaks
-------------------------------------------------------------*/

PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<a id="openInLive1" class="btn-link">Open in Live</a>');
PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<a id="openContentTree1" class="btn-link">Open in Content Tree</a>');
PRIMARY_TOOLBAR_LOCATION.insertAdjacentHTML('beforeend', '<div class="dropdown"><button id="dropdown" class="dropbtn btn-link">Country</button><div class="dropdown-content" id="myDropdown"><a class="countryLink">OPEN ALL</a><a class="countryLink">EN-US</a><a class="countryLink">EN-GB</a><a class="countryLink">EN-IN</a><a class="countryLink">DE-DE</a><a class="countryLink">FR-FR</a><a class="countryLink">IT-IT</a><a class="countryLink">KO-KR</a><a class="countryLink">JA-JP</a><a class="countryLink">ZH-TW</a><a class="countryLink">ZH-CN</a></div></div>');





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
