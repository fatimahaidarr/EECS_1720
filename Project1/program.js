//Check if this is actually the Google search engine and not some other google site.
function isSearch(){
    const classname = document.getElementsByClassName("RNNXgb"); //Class present on one of the divs of the Google search bar.

    if(classname != undefined && classname != null)
        return true;
    else
        return false;
}

//Get URL of current page.
const url = window.location.href;

//Only run on Google domain.
if(url.includes(".nytimes.")){
    //Initialization///////////////////////////////////////////////////////////

    let configuration = {
        "replacePicture": false,
        "removeParagraphTitles": false,
        "paragraphColorBg": false,
       
        
        "words": false        
        
  
    };

    //Store defaults if nothing is stored.
    chrome.storage.sync.get(['configuration'], function(storedConfiguration) { 
        if('configuration' in storedConfiguration)
            configuration = storedConfiguration;
        else
            chrome.storage.sync.set({'configuration': configuration}, function(){});

        modifySearchResults(configuration["configuration"]);
    });
}


////////////////////////////////////////////////////////////////////////


//Receive data from popup.js////////////////////////////////////////////

chrome.runtime.onMessage.addListener(receivedMessage);

function receivedMessage(message, sender, response){
    modifySearchResults(message["configuration"]);
}

/////////////////////////////////////////////////////////////////////////


//Main Function//////////////////////////////////////////////////////////

function modifySearchResults(configuration){

    //Remove arrows at the end of urls////////////////////////////////////
    if(configuration.replacePictures)
        //Remove arrow.
        removeElements(".B6fmyf", 0);
        //Remove arrow from ad.
        removeElements(".e1ycic", 0);
        //Remove 3 dots if present instaed of arrow.
        removeElements(".D6lY4c", 0);
        removeElements(".rIbAWc", 0);

    }

    //Color Url////////////////////////////////////////////////////////////////
    if(configuration.paragraphColorBg)
        setparagraphColorBg(configuration.paragraphColorBg);

    //Move Url////////////////////////////////////////////////////////////////
    if(configuration.removeParagraphTitles){
       //Remove url and icon.
        removeElements(".css-nic7nv", 0);
       
    }

    //Remove Widgets///////////////////////////////////////////
    if(configuration.words)
        removeElements(".otisdd", 2)


////////////////////////////////////////////////////////////////////////////////


//Search results modification functions/////////////////////////////////////////

function setparagraphColorBg(paragraphColorBg){
    if(setparagraphColorBg != ""){
        let listOfElementLists = [
            document.getElementsByClassName("iUh30")//, //url part
            //document.getElementsByClassName("eipWBe"); //urn part
        ]

        //Set the text color for each element.
        forEachDoThis(listOfElementLists, function(element){
            element.style.color = paragraphColorBg;
        });
    }
}

function decreaseResultDistance(className){
    elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++){
        br = elements[i].parentNode.getElementsByTagName('br');
        if(br.length != 0)
            br[0].parentNode.removeChild(br[0]);
    }
}

////////////////////////////////////////////////////////////////////////////////



//Utils/////////////////////////////////////////////////////////////////////////

function removeElements(name, parentNum){
    if(name[0] == '.'){
        name = name.replace('.', '');
        const elements = document.getElementsByClassName(name);

        for (let i = 0; i < elements.length; i++){
            let node = getParentNode(elements[i], parentNum);
            node.style.display = 'none';
        }
    }else if(name[0] == '#'){
        name = name.replace('#', '');

        const element = document.getElementById(name);

        if(element != null)
            getParentNode(element, parentNum).style.display = 'none';
    }else{
        throw "Undefined element!";
    }
}

function getParentNode(element, parentNum){
    let parent = element;

    for(let i = 0; i < parentNum; i++)
        parent = parent.parentNode

    return parent;
}

function ApplyToClass(className, delegate){
    let elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++)
        delegate(elements[i]);
}

function forEachDoThis(listOfElementLists, delegate){
    for(let elementList of listOfElementLists){
        for(element of elementList){
            delegate(element);
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////