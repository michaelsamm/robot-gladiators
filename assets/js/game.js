// Player status variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName,playerAttack,playerHealth,playerMoney);

// Enemy status variables
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

// Fight function
var fight = function() {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");
    // Prompt to fight or skip battle
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // If player chooses to fight then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + "attacked" + enemyName + ". " + enemyName + " now has " + enemyHealth + "health remaining."
        );
        // Check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + "attacked" + playerName + ". " + playerName + " now has " + playerHealth + "health remaining."
        );
        // Check player health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
    // If player chooses to skip then skip
    else if (promptFight === "skip" || promptFight === "SKIP") {
        // Confirm skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // If confirmed skip (true) then skip and subtract money
        if (confirmSkip) {
            window.alert(playerName + " has chosen to skip this fight. Goodbye!");
            playerMoney = playerMoney - 2;
        }
        // If false, ask question again by rerunning fight()
        else {
            fight();
        }
    }
    else {
        window.alert("You need to choose a valid option. Try again!");
    }
};

fight();