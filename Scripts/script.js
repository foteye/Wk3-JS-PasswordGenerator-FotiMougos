// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var inputs = gatherInputs();
    var password = generatePassword(inputs);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}

function gatherInputs() {
    var length = validateLength(prompt("Please enter a password length, between 8 - 128. (Default 8)"));
    var complexity = validateComplexity();

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
    var complexity = {
        'upper': false,
        'lower': true, // included by default, to prevent errors.
        'number': false,
        'symbol': false
    }

    // MMMMM tasty ternary operators
    complexity.upper = (confirm('I would like to include uppercase characters:')) ? true : false;
    complexity.number = (confirm('I would like to include numbers:')) ? true : false;
    complexity.symbol = (confirm('I would like to include symbols:')) ? true : false;

    return complexity;
}

function validateLength(length) {
    if (Number.isNaN(length)) { // Not a number
        return false;
    } else if (!(length >= 8 && length <= 128)) { // Outside bounds, return default
        return "8";
    } else {
        return length;
    }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
