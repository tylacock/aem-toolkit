const PAGE_URL = location.href;
let primaryToolBarLocation = document.getElementsByClassName('_coral-ActionBar-primary')[0];



// primaryToolBarLocation.insertAdjacentHTML('beforeend', '<button id="openInLive1" class="button btn-1 btn-a">Open In live</button>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="openInLive1" class="btn-link">Live</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="editIntl1" class="btn-link">Intl</a>');
primaryToolBarLocation.insertAdjacentHTML('beforeend', '<a href="#" id="openContentTree1" class="btn-link">Location</a>');
console.log(primaryToolBarLocation);


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

// let string_of_html = `<button>POOP</button>`;
// secondaryToolBarLocation.insertAdjacentHTML('afterbegin', string_of_html);
// // let testbutton = document.createElement("button");
// // testbutton.setAttribute("id", "openInLive1");
// // testbutton.innerHTML = "TEST Button";

// add the button to the div
// secondaryToolBarLocation.insertAdjacentHTML('afterbegin', '<button id="openInLive1" class="button btn-1 btn-a">Open In live</button>');

// let p = document.createElement("poop");
// document.body.appendChild(p);


// secondaryToolBarLocation.appendChild(p);

// // Function that opens current AEM page in Live site
// function openInLive() {
//     getTab().then(url => {
//         console.log(url);
//         let country = url.substr(83, 5);
//         let intlPath = url.substr(82).replace('/home/', '/');
//         let usPath = url.substr(82).replace('/en-us/home/', '/');

//         if (country !== 'en-us') {
//             window.open(`https://www.ansys.com${intlPath}`, '_blank')
//         } else {
//             window.open(`https://www.ansys.com${usPath}`, '_blank')
//         }
//     })
// }