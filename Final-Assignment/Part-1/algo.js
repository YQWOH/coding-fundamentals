function reverse(anyString){
    // only change the code below this line
    const string = anyString.toString();
    const rString = string.split("").reverse().join("").toString();
    return rString;
    // only change the code above this line
}
// Test cases
let q1_test1 = reverse('abcde') == 'edcba';
let q1_test2 = reverse('hello') == 'olleh';
let q1_test3 = reverse('Greetings from The Hacker Collective') == 'evitcelloC rekcaH ehT morf sgniteerG';

console.log(q1_test1, q1_test2, q1_test3 ); // Should output all true

function sameBackAndForth(str){
    // only change the code below this line
    let forthString = str.toString();
    let backString = forthString.split("").reverse().join("").toString();
    if (backString === forthString) {
        result = true;
    } else {
        result= false;
    }
    return result;
  }
  
// Test cases
let q2_test1 = sameBackAndForth("abba") === true;
let q2_test2 = sameBackAndForth("abcdefg") === false;
  
console.log(q2_test1, q2_test2); // Should output all true

function reverseInt(num) {
    let number = num.toString().split("")
    let negativeSign =  number[0] === '-' 
    if (negativeSign) {
        let rInt = [number[0], number.splice(1).reverse().join("")].join("")
        return Number(rInt)
    } else {
        return Number(number.reverse().join(""))
    }
}
  
// Test cases
let q3_test1 = reverseInt(15) === 51;
let q3_test2 = reverseInt(981) === 189;
let q3_test3 = reverseInt(500) === 5;
let q3_test4 = reverseInt(-15) === -51;
let q3_test5 = reverseInt(-90) === -9;

console.log(q3_test1 , q3_test2, q3_test3, q3_test4, q3_test5); // Should output all true

function sumArr(array) {
    return array.reduce((previousValue, currentValue) => previousValue + currentValue)
}

// Test cases
let q4_test1 = sumArr([1,2,3,4,5]) == 15
let q4_test2 = sumArr([1000,2000,44,55,22]) == 3121
let q4_test3 = sumArr([123,456,789]) == 1368

console.log(q4_test1 , q4_test2, q4_test3); // Should output all true

function deafGrandma(str) {
    let words = str.toUpperCase().split(" ")
    for (let i = 0; i<words.length; i++) {
        if ( i === words.length -1 ) {
            words[i] = words[i] + "!!"
        } else {
            words[i] = words[i] + "!! "
        }
    }
    return words.join("").toString();
}
// Test cases
const q5_test1 = deafGrandma("I have a bad feeling about this") == "I!! HAVE!! A!! BAD!! FEELING!! ABOUT!! THIS!!"

console.log(q5_test1); // Should output all true

function whatIsMissing(str) { 
    let code = []
    for (i= 0; i <str.length; i++)
    {
        code[i]= str.charCodeAt(i);
    }
    let difference = code[code.length-1] - code[0];
    let listCodes = [code[0]]
    for (let i = 1; i < difference+1 ; i++) {
        listCodes[i] = listCodes[i-1] + 1;
    }

    let codeMissing = listCodes.filter(x => !code.includes(x)); 
    if (codeMissing.length === 0) {
        return undefined;
    } 

    let letterMissing = [];
        
    for (let i = 0; i<codeMissing.length; i++) {
            letterMissing[i] = String.fromCharCode(codeMissing[i]);
    }
    
    return letterMissing.toString();
}

// Test cases
const q6_test1 = whatIsMissing("abcdefghijklmnopqrstuvwxyz") == undefined
const q6_test2 = whatIsMissing("bcdf") == 'e'
const q6_test3 = whatIsMissing("abcdefghjklmno") == 'i'

console.log(q6_test1 , q6_test2, q6_test3); // Should output all true

function swap(sentence,word,newWord) {
    let words = sentence.split(" ")
    let index = sentence.split(" ").indexOf(word)
    let checkFirstLetterCase = words[index][0] === words[index][0].toUpperCase() 
    if (checkFirstLetterCase) {
        newWord = newWord[0].toUpperCase() + newWord.slice(1)
        words.splice(index, 1, newWord)
        return words.join(" ")
    } else {
        newWord = newWord[0].toLowerCase() + newWord.slice(1)
        words.splice(index, 1, newWord)
        return words.join(" ")
    }
}

// Test cases
const q7_test1 = swap("His name is Tom", "Tom", "john") == "His name is John"
const q7_test2 = swap("Let us get back to more Coding", "Coding", "algorithms") == "Let us get back to more Algorithms"
const q7_test3 = swap("This has a spellngi error", "spellngi", "spelling") == "This has a spelling error"

console.log(q7_test1 , q7_test2, q7_test3); // Should output all true
