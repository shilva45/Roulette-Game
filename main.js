var classicModeActive = false;

var currPlayer;
var currIndex;

var news = "";
var load = "";

var totalRounds;
var liveRounds;
var powerupsPerRound;

var pOneLives;
var pOneInitialLives;
var pTwoLives;
var pTwoInitialLives;

var pOnePowerups;
var pOnePowerupTotal = 0;
var pTwoPowerups;
var pTwoPowerupTotal = 0;

var chamber = [];
var displayChamber = [];

var actOne;
var medOne;
var scopeOne;
var flashOne;
var popOne;

var actTwo;
var medTwo;
var scopeTwo;
var flashTwo;
var popTwo;

var damageMultiplier;
var pOneFlash;
var pTwoFlash;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeChamber(){
    needToAdd = liveRounds;

    for(var i = totalRounds; i > 0; i--){
        displayChamber.push('?');
        var randNum = getRandomInt(1, i);
        if(randNum > needToAdd){
            chamber.push(0);
        } else {
            needToAdd--;
            chamber.push(1);
        }
    }
}

function newGame(){
    currPlayer = 1;
    currIndex = 0;

    pOneLives = pOneInitialLives;
    pTwoLives = pTwoInitialLives;

    pOnePowerups = {
        "Action": 0,
        "Med-Kit": 0,
        "Scope": 0,
        "Flashbang": 0,
        "Pops": 0
    }

    pTwoPowerups = {
        "Action": 0,
        "Med-Kit": 0,
        "Scope": 0,
        "Flashbang": 0,
        "Pops": 0
    }

    actOne = true;
    medOne = true;
    scopeOne = true;
    flashOne = true;
    popOne = true;
    
    actTwo = true;
    medTwo = true;
    scopeTwo = true;
    flashTwo = true;
    popTwo = true;

    damageMultiplier = 1;
    pOneFlash = false;
    pTwoFlash = false;

    chamber = [];
    displayChamber = [];

    document.getElementById("p1Lives").innerText = pOneLives;
    document.getElementById("p2Lives").innerText = pTwoLives;

    randomizeChamber();
    populateItemsTable(pOnePowerups, "p1PowerupTableBody");
    populateItemsTable(pTwoPowerups, "p2PowerupTableBody");

    randomizePowerups();
    updateInfo();

    var helpModal = document.getElementById("help-modal-id");
    var helpButton = document.getElementById("help-button-id");
    var helpSpan = document.getElementsByClassName("helpClose")[0];
    var settingsModal = document.getElementById("settings-modal-id");
    var settingsButton = document.getElementById("settings-button-id");
    var settingsSpan = document.getElementsByClassName("settingsClose")[0];

    settingsButton.onclick = function(){
        settingsModal.style.display = "block";
    }

    settingsSpan.onclick = function(){
        settingsModal.style.display = "none";
    }

    helpButton.onclick = function(){
        helpModal.style.display = "block";
    }

    helpSpan.onclick = function(){
        helpModal.style.display = "none";
    }

    window.onclick = function(event){
        if(event.target == helpModal){
            helpModal.style.display = "none";
        }

        if(event.target == settingsModal){
            settingsModal.style.display = "none";
        }
    }
}

function initialSetup(){
    pOneInitialLives = 3;
    pTwoInitialLives = 3;

    pOneLives = pOneInitialLives;
    pTwoLives = pTwoInitialLives;

    totalRounds = 8;
    liveRounds = 3;
    powerupsPerRound = 3;

    powerups = {
        "Action": "See the next round in the chamber.",
        "Med-Kit": "Gain one life.",
        "Scope": "Your next shot will do double the damage.",
        "Flashbang": "Your opponent will not be able to move on their next turn.",
        "Pops": "Remove the next round from the chamber."
    }
    populateItemsTable(powerups, "powerupTableBody");
    
    newGame();
}

function updateSettingsLives(){
    var numInput = document.getElementById('number-1');

    var inputVal = parseInt(numInput.value, 10);

    if(!isNaN(inputVal)){
        pOneInitialLives = inputVal;
        pTwoInitialLives = inputVal;
        newGame();
        updateInfo();
    }
}

function updateSettingsRounds(){
    var numInput = document.getElementById('number-2');

    var inputVal = parseInt(numInput.value, 10);

    if(!isNaN(inputVal)){
        totalRounds = inputVal;
        newGame();
    }
}

function updateSettingsBullets(){
    var numInput = document.getElementById('number-3');

    var inputVal = parseInt(numInput.value, 10);

    if(!isNaN(inputVal)){
        liveRounds = inputVal;
        newGame();
    }
}

function updateSettingsPowerups(){
    var numInput = document.getElementById('number-4');

    var inputVal = parseInt(numInput.value, 10);

    if(!isNaN(inputVal)){
        powerupsPerRound = inputVal;
        newGame();
    }
}

function updateSettingsReset(){
    classicModeActive = false;

    pOneInitialLives = 3;
    pTwoInitialLives = 3;
    totalRounds = 8;
    liveRounds = 3;
    powerupsPerRound = 3;
    
    newGame();
}

function classicRandomSetup(){
    var randNum;
    randNum = getRandomInt(1, 5);

    pOneInitialLives = randNum;
    pTwoInitialLives = randNum;

    randNum = getRandomInt(2, 8);

    totalRounds = randNum;

    liveRounds = Math.floor(randNum / 2);

    randNum = getRandomInt(1, 4);

    powerupsPerRound = randNum;
}

function setupClassicMode(){
    classicModeActive = true;

    classicRandomSetup();
    
    newGame();
}

function resetGame(){
    if(classicModeActive == true){
        setupClassicMode();
    } else {
        newGame();
    }
}

function populateItemsTable(playerPowerups, tableBodyId){
    var tableBody = document.getElementById(tableBodyId);

    for(var powerup in playerPowerups){
        var quantity = playerPowerups[powerup];

        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.textContent = powerup;
        cell2.textContent = quantity;
    }
}

function updatePowerupTable(playerPowerups, tableBodyId){
    var tableBody = document.getElementById(tableBodyId);

    tableBody.innerHTML = '';

    for(var powerup in playerPowerups){
        var quantity = playerPowerups[powerup];

        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.textContent = powerup;
        cell2.textContent = quantity;
    }
}

function randomizePowerups(){
    pOnePowerupTotal = pOnePowerups["Action"] + pOnePowerups["Med-Kit"] + pOnePowerups["Scope"] + pOnePowerups["Flashbang"] + pOnePowerups["Pops"];
    pTwoPowerupTotal = pTwoPowerups["Action"] + pTwoPowerups["Med-Kit"] + pTwoPowerups["Scope"] + pTwoPowerups["Flashbang"] + pTwoPowerups["Pops"];

    for(var i = 0; i < powerupsPerRound && pOnePowerupTotal < 8; i++){
        var randPowerup = getRandomInt(1, 5);

        switch (randPowerup) {
            case 1:
                pOnePowerups["Action"]++;
                break;
            case 2:
                pOnePowerups["Med-Kit"]++;
                break;
            case 3:
                pOnePowerups["Scope"]++;
                break;
            case 4:
                pOnePowerups["Flashbang"]++;
                break;
            case 5:
                pOnePowerups["Pops"]++;
                break;
            default:
                break;
        }

        pOnePowerupTotal = pOnePowerups["Action"] + pOnePowerups["Med-Kit"] + pOnePowerups["Scope"] + pOnePowerups["Flashbang"] + pOnePowerups["Pops"];
    }
    
    for(var i = 0; i < powerupsPerRound && pTwoPowerupTotal < 8; i++){
        var randPowerup = getRandomInt(1, 5);

        switch (randPowerup) {
            case 1:
                pTwoPowerups["Action"]++;
                break;
            case 2:
                pTwoPowerups["Med-Kit"]++;
                break;
            case 3:
                pTwoPowerups["Scope"]++;
                break;
            case 4:
                pTwoPowerups["Flashbang"]++;
                break;
            case 5:
                pTwoPowerups["Pops"]++;
                break;
            default:
                break;
        }

        pTwoPowerupTotal = pTwoPowerups["Action"] + pTwoPowerups["Med-Kit"] + pTwoPowerups["Scope"] + pTwoPowerups["Flashbang"] + pTwoPowerups["Pops"];
    }
}

function updateInfo(){
    load = "";

    if(pOneLives <= 0){
        news += " Player 2 wins!";
        for(var i = currIndex; i < totalRounds; i++){
            if(chamber[i] === 1) displayChamber[i] = 'L';
            else displayChamber[i] = 'B';
        }
    } else if(pTwoLives <= 0){
        news += " Player 1 wins!";
        for(var i = currIndex; i < totalRounds; i++){
            if(chamber[i] === 1) displayChamber[i] = 'L';
            else displayChamber[i] = 'B';
        }
    } else if(pOneFlash && currPlayer === 1){
        news += " Player 1 cannot move! Skipping...";
        pOneFlash = false;
        currPlayer = 2;
    } else if(pTwoFlash && currPlayer === 2){
        news += " Player 2 cannot move! Skipping...";
        pTwoFlash = false;
        currPlayer = 1;
    }

    document.getElementById("news").innerText = news;
    document.getElementById("load").innerText = load;
    document.getElementById("chamber").innerText = displayChamber;
    document.getElementById("player-turn").innerText = currPlayer;
    document.getElementById("p1Lives").innerText = pOneLives;
    document.getElementById("p2Lives").innerText = pTwoLives;

    // reset chamber if game still ongoing
    if(currIndex === totalRounds && !(pOneLives <= 0 || pTwoLives <= 0)){
        if(classicModeActive == true) classicRandomSetup();

        load = "Loaded " + (totalRounds - liveRounds) + " blank, " + liveRounds + " live.";
        load += " Each player received " + powerupsPerRound + " powerups.";
        document.getElementById("load").innerText = load;

        chamber = [];
        displayChamber = [];
        randomizeChamber();
        randomizePowerups();
        currIndex = 0;
    }

    updatePowerupTable(pOnePowerups, "p1PowerupTableBody");
    updatePowerupTable(pTwoPowerups, "p2PowerupTableBody");
}

function shootSelf(){
    if(pOneLives <= 0){
        news = "Player 2 wins!";
        return;
    } else if(pTwoLives <= 0){
        news = "Player 1 wins!";
        return;
    }

    // blank round
    if(chamber[currIndex] === 0){
        displayChamber[currIndex] = 'B';
        if(currPlayer === 1){
            currIndex++;
            news = "Player 1 shot a blank round. Their turn continues!";
        } else {
            currIndex++;
            news = "Player 2 shot a blank round. Their turn continues!";
        }
    }

    // live round
    else {
        displayChamber[currIndex] = 'L';
        if(currPlayer === 1){
            currIndex++;
            currPlayer = 2;
            pOneLives -= damageMultiplier;
            news = "Player 1 shot a live round!";
        } else {
            currIndex++;
            currPlayer = 1;
            pTwoLives -= damageMultiplier;
            news = "Player 2 shot a live round!";
        } 
    }
        
    actOne = true;
    medOne = true;
    scopeOne = true;
    flashOne = true;
    popOne = true;
    
    actTwo = true;
    medTwo = true;
    scopeTwo = true;
    flashTwo = true;
    popTwo = true;  
    
    damageMultiplier = 1;

    updateInfo();
}

function shootFoe() {
    if(pOneLives <= 0){
        news = "Player 2 wins!";
        return;
    } else if(pTwoLives <= 0){
        news = "Player 1 wins!";
        return;
    }

    // blank round
    if(chamber[currIndex] === 0){
        displayChamber[currIndex] = 'B';
        if(currPlayer === 1){
            currIndex++;
            currPlayer = 2;
            news = "Player 1 shot a blank round. Their turn is skipped.";
        } else {
            currIndex++;
            currPlayer = 1;
            news = "Player 2 shot a blank round. Their turn is skipped.";
        }
    }

    // live round
    else {
        displayChamber[currIndex] = 'L';
        if(currPlayer === 1){
            currIndex++;
            currPlayer = 2;
            pTwoLives -= damageMultiplier;
            news = "Player 1 shot a live round!";
        } else {
            currIndex++;
            currPlayer = 1;
            pOneLives -= damageMultiplier;
            news = "Player 2 shot a live round!";
        }
    }
    
    actOne = true;
    medOne = true;
    scopeOne = true;
    flashOne = true;
    popOne = true;
    
    actTwo = true;
    medTwo = true;
    scopeTwo = true;
    flashTwo = true;
    popTwo = true;

    damageMultiplier = 1;

    updateInfo();
}

function viewAction(){
    if(pOneLives <= 0){
        news = "Player 2 wins!";
        return;
    } else if(pTwoLives <= 0){
        news = "Player 1 wins!";
        return;
    }

    if(currPlayer === 1){
        if(pOnePowerups["Action"] > 0 && actOne){
            pOnePowerups["Action"]--;
            actOne = false;
            if(chamber[currIndex] === 1) news = "Next round is a live round!";
            else news = "Next round is a blank.";
        } else {
            news = "You cannot use this item!";
        }
    } else {
        if(pTwoPowerups["Action"] > 0 && actTwo){
            pTwoPowerups["Action"]--;
            actTwo = false;
            if(chamber[currIndex] === 1) news = "Next round is a live round!";
            else news = "Next round is a blank.";
        } else {
            news = "You cannot use this item!";
        }
    }

    updateInfo();
}

function useKit(){
    if(pOneLives <= 0){
        news = "Player 2 wins!";
        return;
    } else if(pTwoLives <= 0){
        news = "Player 1 wins!";
        return;
    }

    if(currPlayer === 1){
        if(pOnePowerups["Med-Kit"] > 0 && medOne && pOneLives < pOneInitialLives){
            pOnePowerups["Med-Kit"]--;
            pOneLives++;
            medOne = false;
            news = "Player 1 gained a life!";
        } else {
            news = "You cannot use this item!";
        }
    } else {
        if(pTwoPowerups["Med-Kit"] > 0 && medTwo && pTwoLives < pTwoInitialLives){
            pTwoPowerups["Med-Kit"]--;
            pTwoLives++;
            medTwo = false;
            news = "Player 2 gained a life!";
        } else {
            news = "You cannot use this item!";
        }
    }

    updateInfo();
}

function useScope(){
    if(pOneLives <= 0){
        news = "Player 2 wins!";
        return;
    } else if(pTwoLives <= 0){
        news = "Player 1 wins!";
        return;
    }

    if(currPlayer === 1){
        if(pOnePowerups["Scope"] > 0 && scopeOne){
            pOnePowerups["Scope"]--;
            damageMultiplier = 2;
            scopeOne = false;
            news = "Player 1 doubled the next shot's damage!";
        } else {
            news = "You cannot use this item!";
        }
    } else {
        if(pTwoPowerups["Scope"] > 0 && scopeTwo){
            pTwoPowerups["Scope"]--;
            damageMultiplier = 2;
            scopeTwo = false;
            news = "Player 2 doubled the next shot's damage!";
        } else {
            news = "You cannot use this item!";
        }
    }

    updateInfo();
}

function useFlash(){
    if(pOneLives <= 0){
        news = "Player 2 wins!";
        return;
    } else if(pTwoLives <= 0){
        news = "Player 1 wins!";
        return;
    }

    if(currPlayer === 1){
        if(pOnePowerups["Flashbang"] > 0 && flashOne){
            pOnePowerups["Flashbang"]--;
            flashOne = false;
            pTwoFlash = true;
            news = "Player 2 cannot move next turn!";
        } else {
            news = "You cannot use this item!";
        }
    } else {
        if(pTwoPowerups["Flashbang"] > 0 && flashTwo){
            pTwoPowerups["Flashbang"]--;
            flashTwo = false;
            pOneFlash = true;
            news = "Player 1 cannot move next turn!";
        } else {
            news = "You cannot use this item!";
        }
    }

    updateInfo();
}

function popRound(){
    if(pOneLives <= 0){
        news = "Player 2 wins!";
        return;
    } else if(pTwoLives <= 0){
        news = "Player 1 wins!";
        return;
    }

    if(currPlayer === 1){
        if(pOnePowerups["Pops"] > 0 && popOne){
            pOnePowerups["Pops"]--;
            popOne = false;
            if(chamber[currIndex] === 1){
                displayChamber[currIndex] = 'L';
                news = "Removed a live round!";
            } else {
                displayChamber[currIndex] = 'B';
                news = "Removed a blank!";
            }
            currIndex++;
        } else {
            news = "You cannot use this item!";
        }
    } else {
        if(pTwoPowerups["Pops"] > 0 && popTwo){
            pTwoPowerups["Pops"]--;
            popTwo = false;
            if(chamber[currIndex] === 1){
                displayChamber[currIndex] = 'L';
                news = "Removed a live round!";
            } else {
                displayChamber[currIndex] = 'B';
                news = "Removed a blank!";
            }
            currIndex++;
        } else {
            news = "You cannot use this item!";
        }
    }

    updateInfo();
}