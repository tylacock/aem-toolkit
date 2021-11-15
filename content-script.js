const PAGE_URL = location.href;
let primaryToolBarLocation = document.getElementsByClassName('_coral-ActionBar-primary')[0];




primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="openInLive1" class="btn-link">Live</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="editIntl1" class="btn-link">Country</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="openContentTree1" class="btn-link">Content</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<div class="dropdown"><button id="dropdown" class="dropbtn btn-link" ">Dropdown<i class="fa fa-caret-down"></i></button><div class="dropdown-content" id="myDropdown"><a href="#" class="countryLink">EN-US</a><a href="#" class="countryLink">EN-GB</a><a href="#" class="countryLink">EN-IN</a><a href="#" class="countryLink">DE-DE</a><a href="#" class="countryLink">FR-FR</a><a href="#" class="countryLink">IT-IT</a><a href="#" class="countryLink">KO-KR</a><a href="#" class="countryLink">JA-JP</a><a href="#" class="countryLink">ZH-TW</a><a href="#" class="countryLink">ZH-CN</a></div></div>');


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



// Listeners
openInLive1.addEventListener("click", async() => {
    openInLive();
});


editIntl1.addEventListener("click", async() => {
    editIntl();
});

openContentTree1.addEventListener("click", async() => {
    openContentTree();
});

dropdown.addEventListener("click", async() => {
    toggleDropdown();
});

// Opens AEM page in corresponding country page.
let countryButton = document.getElementsByClassName("countryLink");
for (var i = 0, length = countryButton.length; i < length; i++) {
    var anchor = countryButton[i];
    anchor.addEventListener('click', function() {
        // `this` refers to the anchor tag that's been clicked
        let path = (PAGE_URL.substr(89));
        let countryId = this.innerText;
        window.open(`https://author-p16153-e39454.adobeaemcloud.com/editor.html/content/ansysincprogram/${countryId.toLowerCase()}/${path}`, '_blank');
    }, true);
};