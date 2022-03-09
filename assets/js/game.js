// Player status variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Enemy status variables
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Fight function
var fight = function(enemyName) {
    // Repeat and execute as long as the enemy robot AND player robot are alive
    while(enemyHealth > 0 && playerHealth > 0) {
        // Prompt to fight or skip battle
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If player chooses to skip then skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // If confirmed skip (true) then skip and subtract money
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip this fight. Goodbye!");
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
 
        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        // Check enemy health then award money and break loop if zero or less
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            playerMoney = playerMoney + 20;
            console.log("playerMoney", playerMoney)
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
        // Check player health and break loop if zero or less
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } // end of while loop
}; // end of fight function

// function to start game
var startGame = function() {
    // Reset player stats at start of game
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // Select a robot to fight by looping through enemyNames array
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // Announce round number
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
            // Pick a new enemy based on enemyNames array index
            var pickedEnemyName = enemyNames[i];
            // Reset robot health to 50
            enemyHealth = 50;
            // Execute fight function with selected robot's name
            fight(pickedEnemyName);

            // allow shopping if not at the last enemy in the array
            if (i < enemyNames.length - 1 && playerHealth > 0) {

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
    // if player is still alive, player wins
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
    
    // actions player can execute
    switch(shopOptionPrompt) {
    // replenish health
    case "refill":
    case "REFILL":
        if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney -7;
            break;
        }
        else {
            window.alert("You don't have enough money!");
        }
    // upgrade robot
    case "upgrade":
    case "UPGRADE":
        if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
            break;
        }
        else {
            window.alert("You don't have enough money!");
        }
    // leave shop
    case "leave":
    case "LEAVE":
        window.alert("Leaving the store.");
        break;
    // else
    default:
        window.alert("You did not pick a valid option. Try again.");
        shop();
        break;
    }
}

// start the game when the page loads
startGame ();