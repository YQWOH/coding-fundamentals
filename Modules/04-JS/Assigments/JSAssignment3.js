function factorial(anyNumber){  
    let fNumber = 1;
    for (let i=anyNumber; i > 1; i--) {
        fNumber *= i;
    }
    return fNumber;
}

console.log(factorial(5) === 120)
console.log(factorial(4) === 24)
console.log(factorial(1) === 1)