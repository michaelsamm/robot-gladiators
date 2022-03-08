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
    }
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}


// Game states
// "WIN" - player robot has defeated all enemy robots
//  * Fight all enemy robots
//  * Defeat each enemy robot
// "LOSE" - player robot's health is zero or less