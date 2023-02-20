function missingLetter(str) { 
    // if (str === "abcdefghijklmnopqrstuvwxyz") return undefined;
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
  
console.log(missingLetter("abce") === "d");
console.log(missingLetter("abcdefghjklmno") === "i");
console.log(missingLetter("stvwx") === "u");
console.log(missingLetter("bcdf") === "e");
console.log(missingLetter("abcdefghijklmnopqrstuvwxyz") === undefined);