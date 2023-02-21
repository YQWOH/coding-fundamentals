const generationGender = [
    {id: -3, gender: { m: "great grandfather", f: "great grandmother"}},
    {   id: -2, 
        gender: {
            "m": "grandfather",
            "f": "grandmother"
        }
    },
    {   id: -1, 
        gender: {
            "m": "father",
            "f": "mother"
        }
    },
    {   id: 0, 
        gender: {
            "m": "me!",
            "f": "me!"
        }
    },
    {   id: 1, 
        gender: {
            "m": "son",
            "f": "daughter"
        }
    },
    {   id: 2, 
        gender: {
            "m": "grandson",
            "f": "granddaughter"
        }
    },
    {   id: 3, 
        gender: {
            "m": "great grandson",
            "f": "great granddaughter"
        }
    },
] 

function generation (x, y) {
    const index = generationGender.findIndex(item => item.id === x);
    
    return generationGender[index].gender[y];
}

console.log(generation(2, "f"));
console.log(generation(-3, "m"));
console.log(generation(1, "f"));