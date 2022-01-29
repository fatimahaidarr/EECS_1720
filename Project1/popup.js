window.addEventListener('load', (event) => {
    //Initialization////////////////////////////////////////////////////
    chrome.storage.sync.get(['configuration'], function(configuration) { 
        setUI(configuration["configuration"]);
    });

    ////////////////////////////////////////////////////////////////////

    //Events////////////////////////////////////////////////////////////

    ///////////////////////

    //Checkbox events//////////////////////
    document.getElementById("replacePicturesCheckBox").addEventListener("change", event =>{
        changeConfig("replacePictures", event.target.checked);
    });

    document.getElementById("removeParagraphTitlesCheckbox").addEventListener("change", event =>{
        changeConfig("removeParagraphTitles", event.target.checked);
    });


    document.getElementById("paragraphColorBgCheckbox").addEventListener("change", event =>{
        changeConfig("paragrapgColorBg", event.target.checked);
    });

    



    document.getElementById("wordsCheckBox").addEventListener("change", event =>{
        changeConfig("words",event.target.checked);
    });


    
     
    //Functions////////////////////////////////////////////////////////////

    function setUI(configuration){
        document.getElementById("replacePicturesCheckbox").checked = configuration.replacePictures;
        document.getElementById("removeParagraphTitlesCheckbox").checked = configuration.removeParagraphTitles;
        
        document.getElementById("paragraphColorBgCheckbox").checked = configuration.paragraphColorBg;
        document.getElementById("wordsCheckBox").value  = configuration.words;

        
    }

    function changeConfig(key, value){
        chrome.storage.sync.get(['configuration'], function(configuration) { 
            configuration["configuration"][key] = value;

            chrome.storage.sync.set({'configuration': configuration["configuration"]}, function(){});

            sendToProgramJS(configuration);
        });
    }

    function sendToProgramJS(payload){
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, payload);
        });
    }

    //////////////////////////////////////////////////////////////////////
});