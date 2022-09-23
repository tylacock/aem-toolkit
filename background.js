
//Fires when select omnibox for extension
chrome.omnibox.onInputStarted.addListener(function(){
    //Set a default ...
    console.log('event started...');
});


//fires when select option and press enter
chrome.omnibox.onInputEntered.addListener(function(text){
    //Open selection into a new tab
    

    switch (text) {
        case "prod":
            chrome.tabs.create({url: "https://www.ansys.com/products"})
            break;
        case "fl":
            chrome.tabs.create({url: "https://www.ansys.com/products/fluids"})
        case "ev":
                chrome.tabs.create({url: "https://www.ansys.com/events"})
        default:
            chrome.tabs.create({url: "https://www.ansys.com/" + text})
            break;
    } 
});


//fires when input changes e.g keyUp
// chrome.omnibox.onInputChanged.addListener(function(text, suggest){
//     //could send a request to my server to autofill resuts to add here....
//     //{}

//     // Add suggestions to an array
//     var suggestions = [];
//     //search reddit
//     suggestions.push({ deletable: true, content: "https://www.ansys.com/" + text, description: '(Open section ) '+text });

//     // Return  suggestions
//     suggest(suggestions);
// });