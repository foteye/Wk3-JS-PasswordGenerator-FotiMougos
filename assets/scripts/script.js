// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var inputs = gatherInputs();
    if (! inputs) {
        alert('Error: Please select at least one type of character to generate the password with');
        return;
    }
    var password = generatePassword(inputs);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}

function gatherInputs() {
    var length = validateLength(prompt("Please enter a password length, between 8 - 128. (Default 8)"));
    var complexity = validateComplexity();
    if (! complexity) {
        return false;
    }

    return {'length': length, 'complexity': complexity};
}

function generatePassword(inputs) {
    var listUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var listLower = "abcdefghijklmnopqrstuvwxyz";
    var listNum = "1234567890";
    var listSym = "!@#$%^&*()-+<>";
    var listAll = "";
    var length = inputs.length;
    var complexity = inputs.complexity;
    var password = "";

    // Add selected complexities to list
    listAll += (complexity.upper) ? listUpper : "";
    listAll += (complexity.lower) ? listLower : "";
    listAll += (complexity.number) ? listNum : "";
    listAll += (complexity.symbol) ? listSym : "";

    for (var i = 0; i < length; i++) {
        var k = Math.floor(Math.random() * listAll.length);
        password += listAll.charAt(k);
    }

    return password;

}

function validateComplexity() {
    var inputsValidated = false; // true if at least one complexity
    var complexity = {
        'upper': false,
        'lower': false,
        'number': false,
        'symbol': false
    }

    // Confirm user input
    // MMMMM tasty ternary operators
    complexity.lower = (confirm('I would like to include lowercase characters:')) ? true : false;
    complexity.upper = (confirm('I would like to include uppercase characters:')) ? true : false;
    complexity.number = (confirm('I would like to include numbers:')) ? true : false;
    complexity.symbol = (confirm('I would like to include symbols:')) ? true : false;

    // Test each complexity value - if at least one is found to be true, input is validated & return early
    for (key in complexity) {
        if (complexity[key] == true) {
            inputsValidated = true;
            break; // break early
        }
    }

    if (inputsValidated) {
        return complexity;
    } else {
        return false;
    }

}

function validateLength(length) {
    if (!Number.isNaN(length)) { // Not a number
        alert("Invalid input: '" + length + "' - Defaulting to 8");
        return 8;
    } else if (length < 8) {
        alert("Number too small: '" + length + "' - Increasing to 8");
        return 8;
    } else if (length > 128) { // Outside bounds, return default
        alert("Number too large: '" + length + "' - Decreasing to 128");
        return 128;
    } else {
        return length;
    }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
