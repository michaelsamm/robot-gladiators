
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}


// Handle null responses for fight/skip prompt
var fightOrSkip = function() {
    // prompt to fight/skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // conditional recursive function
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // make prompt case insensitive
    promptFight = promptFight.toLowerCase();

    // if Skip, confirm and stop the loop
    if (promptFight === "skip") {
        //confirm skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if confirmed skip, leave battle
        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip this fight. Goodbye!");
            //subtract money for skipping but don't let them go negative
            playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
            
            return true;
        }
    }
    return false;
}

// Fight function
var fight = function(enemy) {
    // Repeat and execute as long as the enemy robot AND player robot are alive
    while(enemy.health > 0 && playerInfo.health > 0) {
        // Prompt to fight or skip battle
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }
        
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
 
        //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );
        // Check enemy health then award money and break loop if zero or less
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            playerInfo.money = playerInfo.money + 20;
            console.log("playerInfo.money", playerInfo.money)
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
        // Check player health and break loop if zero or less
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    } // end of while loop
}; // end of fight function

// function to start game
var startGame = function() {
    // Reset player stats at start of game
    playerInfo.reset();

    // Select a robot to fight by looping through enemy.names array
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Announce round number
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
            // Pick a new enemy based on enemy.names array index
            var pickedEnemyObj = enemyInfo[i];
            // Reset robot health to random value from 40-60
            pickedEnemyObj.health = randomNumber(40, 60);
            // Execute fight function with selected robot's name
            fight(pickedEnemyObj);

            // allow shopping if not at the last enemy in the array
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {

                // prompt to shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // either out of health or out of enemies to fight
    endGame();
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }

    // if player robot was defeated
    else {
        window.alert("You've lost your robot in battle.");
    }

    // play again?
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

// shop function
var shop = function() {
    // provide player with shop options
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
        );

    // convert prompt responses from string to integers
    shopOptionPrompt = parseInt(shopOptionPrompt);
    
    // actions player can execute
    switch(shopOptionPrompt) {
    // replenish health
    case 1:
        playerInfo.refillHealth();
        break;
    // upgrade robot
    case 2:
        playerInfo.upgradeAttack();
        break;
    // leave shop
    case 3:
        window.alert("Leaving the store.");
        break;
    // else
    default:
        window.alert("You did not pick a valid option. Try again.");
        shop();
        break;
    }
}


// function to set name
var getPlayerName = function() {
    var name = "";
    // add loop here to check for null values
    while(name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}


// Player status variables
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
};

// Enemy status variables
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);



// start the game when the page loads
startGame ();