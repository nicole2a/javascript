var diceLocked = [false, false, false, false, false];
var myDie = ["../images/dice-1.png", "../images/dice-2.png", "../images/dice-3.png", "../images/dice-4.png", "../images/dice-5.png", "../images/dice-6.png"];


var rollsLeft = 3;

function rollDice() {
    if (rollsLeft === 0) {
        alert("You don't have any rolls left. Please lock a score.");
        return;
    }


    //rollt elke dice die niet is gelocked
    for (var i = 0; i < 5; i++) {
        if (!diceLocked[i]) {
            document.getElementById("dice-" + (i + 1)).src = myDie[randomDice()];
        }
    }
    updateScores();
    //zorgt voor elke keer 1 minder roll
    rollsLeft--;

    //doei doei roll button
    if (rollsLeft === 0) {
        disableRollButton();
    }
}

function disableRollButton() {
    document.getElementById("rollButton").disabled = true;
}

//als 3 rolls voorbij of lockedscore de locked dices unlocked
function resetLockedDice() {
    diceLocked = [false, false, false, false, false];

    var dieContainers = document.querySelectorAll(".die-container");
    dieContainers.forEach(container => {
        container.classList.remove("locked");
    });
}

//button zegt weer "hello world!"
function enableRollButton() {
    document.getElementById("rollButton").disabled = false;
    resetLockedDice();
}

//zorgt voor random foto
function randomDice() {
    return Math.floor(Math.random() * 6);
}

//dice locked
function lockDice(diceId) {
    var dieIndex = parseInt(diceId.slice(-1)) - 1;
    diceLocked[dieIndex] = !diceLocked[dieIndex];
    var dieContainer = document.getElementById("dice-" + (dieIndex + 1)).parentNode;
    dieContainer.classList.toggle("locked", diceLocked[dieIndex]);
}

//functie om punten te locken voor een categorie
function lockPoints(category) {
    console.log("Locking points for category: " + category);

    var player1CategoryCell = document.getElementById("player-1-" + category);
    var player2CategoryCell = document.getElementById("player-2-" + category);

    if (player1CategoryCell.classList.contains("locked") || player2CategoryCell.classList.contains("locked")) {
        alert("Points for this category are already locked!");
        return;
    }

    if (rollsLeft === 3) {
        alert("You must roll the dice before locking a score.");
        return;
    }

    lockCategory(player1CategoryCell);
    lockCategory(player2CategoryCell);

    updateTotalScores();

    rollsLeft = 3;
    enableRollButton();
}

function lockCategory(categoryCell) {
    categoryCell.classList.add("locked");
}


//update voor totale scores voor beide players
function updateTotalScores() {
    console.log("Updating total scores...");
    
    updateTotalScore("player-1");
    updateTotalScore("player-2");
}


function updateTotalScores() {
    console.log("Updating total scores...");
    
    updateTotalScore("player-1");
    updateTotalScore("player-2");
    updateTotal2Score("player-1");
    updateTotal2Score("player-2");
    updateGrandTotal("player-1");
    updateGrandTotal("player-2");
}

//2e part van de totale score (meer als een totale hoofdpijn)
function updateTotal2Score(player) {
    var total2Score = calculateSpecialScores(player);
    
    document.getElementById(player + "-total2").textContent = total2Score;
}

//weer een update for speler zn total maar dan alles bij elkaar en uitgerekend :D
function updateTotalScore(player) {
    var totalScore = 0;
    var bonus = calculateBonus(player);

    for (var i = 1; i <= 13; i++) {
        var categoryCellId = player + "-" + getCategoryName(i);
        var categoryCell = document.getElementById(categoryCellId);
        
        if (categoryCell && categoryCell.classList.contains("locked")) {
            totalScore += parseInt(categoryCell.textContent);
        }
    }

    document.getElementById(player + "-total").textContent = totalScore;
    document.getElementById(player + "-bonus").textContent = bonus; 
    document.getElementById(player + "-Grand-Total").textContent = totalScore + bonus; 
}

function updateGrandTotal(player) {
    var totalScore = parseInt(document.getElementById(player + "-total").textContent);
    var bonus = parseInt(document.getElementById(player + "-bonus").textContent);
    var total2Score = parseInt(document.getElementById(player + "-total2").textContent);

    document.getElementById(player + "-Grand-Total").textContent = totalScore + bonus + total2Score;
}

function updateTotalScores() {
    console.log("Updating total scores...");
    
    updateTotalScore("player-1");
    updateTotalScore("player-2");
    updateTotal2Score("player-1");
    updateTotal2Score("player-2");
    updateGrandTotal("player-1");
    updateGrandTotal("player-2");
}

function calculateSpecialScores(player) {
    var specialScores = 0;
    
    specialScores += calculateCategoryScore(player + "-ThreeofaKind", -1);
    specialScores += calculateCategoryScore(player + "-FourofaKind", -2);
    specialScores += calculateCategoryScore(player + "-FullHouse", -3);
    specialScores += calculateCategoryScore(player + "-SmallStraight", -4);
    specialScores += calculateCategoryScore(player + "-LargeStraight", -5);
    specialScores += calculateCategoryScore(player + "-Chance", -6);
    specialScores += calculateCategoryScore(player + "-Yahtzee", -7);

    return specialScores;
}

// bonus
function calculateBonus(player) {
    var upperSectionScore = 0;
    var upperSectionLocked = true; 

    for (var i = 1; i <= 6; i++) {
        var categoryCellId = player + "-" + getCategoryName(i);
        var categoryCell = document.getElementById(categoryCellId);
        
        if (categoryCell && categoryCell.classList.contains("locked")) {
            upperSectionScore += parseInt(categoryCell.textContent);
        } else {
            upperSectionLocked = false;
        }
    }
//checkt of alles is gelocked en of de score 63 is en add de bonus score
    if (upperSectionLocked && upperSectionScore >= 63) {
        return 35;
    } else {
        return 0;
    }
}

function displayBonus(player, bonus) {
    document.getElementById(player + "-bonus").textContent = bonus;
}

//alles vernoemd naar nummer omdat makkelijker 
function getCategoryName(value) {
    switch (value) {
        case 1:
            return "Ones";
        case 2:
            return "Twos";
        case 3:
            return "Threes";
        case 4:
            return "Fours";
        case 5:
            return "Fives";
        case 6:
            return "Sixes";
        default:
            return "";
    }
}

function updateScores() {
    updateCategoryScore("Ones", 1);
    updateCategoryScore("Twos", 2);
    updateCategoryScore("Threes", 3);
    updateCategoryScore("Fours", 4);
    updateCategoryScore("Fives", 5);
    updateCategoryScore("Sixes", 6);
    updateCategoryScore("ThreeofaKind", -1);
    updateCategoryScore("FourofaKind", -2);
    updateCategoryScore("FullHouse", -3);
    updateCategoryScore("SmallStraight", -4);
    updateCategoryScore("LargeStraight", -5);
    updateCategoryScore("Chance", -6);
    updateCategoryScore("Yahtzee", -7);
}

function updateCategoryScore(category, value) {
    var player1Score = calculateCategoryScore("player-1-" + category, value);
    var player2Score = calculateCategoryScore("player-2-" + category, value);

    document.getElementById("player-1-" + category).textContent = player1Score;
    document.getElementById("player-2-" + category).textContent = player2Score;
}

function calculateCategoryScore(categoryCellId, value) {
    var categoryCell = document.getElementById(categoryCellId);
    if (categoryCell.classList.contains("locked")) {
        return parseInt(categoryCell.textContent);
    }

    if (value > 0) {
        //ones to sixes
        var count = 0;
        for (var i = 0; i < 5; i++) {
            if (parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4)) === value) {
                count++;
            }
        }
        document.getElementById(categoryCellId).textContent = count * value;
        return count * value;
    } else {
        switch (value) {
            case -1: //three of a Kind
                var sum = 0;
                var counts = {};
                for (var i = 0; i < 5; i++) {
                    var dieValue = parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4));
                    sum += dieValue;
                    counts[dieValue] = (counts[dieValue] || 0) + 1;
                }
                var threeOfAKind = Object.values(counts).some(val => val >= 3);
                if (threeOfAKind) {
                    document.getElementById(categoryCellId).textContent = sum;
                    return sum;
                } else {
                    document.getElementById(categoryCellId).textContent = 0;
                    return 0;
                }
            case -2: //four of a Kind
                var sum = 0;
                var counts = {};
                for (var i = 0; i < 5; i++) {
                    var dieValue = parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4));
                    sum += dieValue;
                    counts[dieValue] = (counts[dieValue] || 0) + 1;
                }
                var fourOfAKind = Object.values(counts).some(val => val >= 4);
                if (fourOfAKind) {
                    document.getElementById(categoryCellId).textContent = sum;
                    return sum;
                } else {
                    document.getElementById(categoryCellId).textContent = 0;
                    return 0;
                }
            case -6: //chance
                var sum = 0;
                for (var i = 0; i < 5; i++) {
                    sum += parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4));
                }
                document.getElementById(categoryCellId).textContent = sum;
                return sum;
            case -3: //full House
                var counts = {};
                for (var i = 0; i < 5; i++) {
                    var dieValue = parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4));
                    counts[dieValue] = (counts[dieValue] || 0) + 1;
                }
                var keys = Object.keys(counts);
                if ((keys.length === 2) && (counts[keys[0]] === 2 || counts[keys[0]] === 3)) {
                    document.getElementById(categoryCellId).textContent = 25;
                    return 25;
                } else {
                    document.getElementById(categoryCellId).textContent = 0;
                    return 0;
                }
            case -4: //small Straight
                var score = calculateSmallStraight();
                document.getElementById(categoryCellId).textContent = score;
                return score;
            case -5: //large Straight
                var score = calculateLargeStraight();
                document.getElementById(categoryCellId).textContent = score;
                return score;
            case -7: //yahtzee
                var counts = {};
                for (var i = 0; i < 5; i++) {
                    var dieValue = parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4));
                    counts[dieValue] = (counts[dieValue] || 0) + 1;
                }
                var keys = Object.keys(counts);
                if (keys.length === 1) {
                    document.getElementById(categoryCellId).textContent = 50;
                    return 50;
                } else {
                    document.getElementById(categoryCellId).textContent = 0;
                    return 0;
                }
            default:
                return 0;
        }
    }
}

function calculateSmallStraight() {
    var sortedValues = [];
    for (var i = 0; i < 5; i++) {
        sortedValues.push(parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4)));
    }
    sortedValues.sort((a, b) => a - b);
    var uniqueValues = new Set(sortedValues);
    if (uniqueValues.size >= 4 && (sortedValues[3] - sortedValues[0] <= 3)) {
        return 30;
    } else {
        return 0;
    }
}

function calculateLargeStraight() {
    var sortedValues = [];
    for (var i = 0; i < 5; i++) {
        sortedValues.push(parseInt(document.getElementById("dice-" + (i + 1)).src.slice(-5, -4)));
    }
    sortedValues.sort((a, b) => a - b);
    var uniqueValues = new Set(sortedValues);
    if (uniqueValues.size === 5 && (sortedValues[4] - sortedValues[0] === 4)) {
        return 40;
    } else {
        return 0;
    }
}