function possibleBonus(a, b) {
    let checkEntries = a > 0 && b > 0
    if (checkEntries) {
        let expression = b - a
        const isDiceNumber = expression > 0 && expression <= 6
        if (expression > 0) {
           console.log(isDiceNumber)
        }
        else {
            console.log(false)
        }   
    } else {
        console.log("Please enter parameter with value > 0") 
    }
}

possibleBonus(3, 7);
possibleBonus(1, 9);
possibleBonus(5, 3);
