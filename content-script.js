const PAGE_URL = location.href;
let primaryToolBarLocation = document.getElementsByClassName('_coral-ActionBar-primary')[0];




primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="openInLive1" class="btn-link">Live</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="editIntl1" class="btn-link">Intl</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="openContentTree1" class="btn-link">Location</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<div class="dropdown"><button id="dropdown" class="dropbtn btn-link" onclick="myFunction()">Dropdown<i class="fa fa-caret-down"></i></button><div class="dropdown-content" id="myDropdown"><a href="#">EN-US</a><a href="#">EN-GB</a><a href="#">EN-IN</a><a href="#">DE-DE</a><a href="#">FR-FR</a><a href="#">IT-IT</a><a href="#">KO-KR</a><a href="#">JA-JP</a><a href="#">ZH-TW</a><a href="#">ZH-CN</a></div></div>');










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