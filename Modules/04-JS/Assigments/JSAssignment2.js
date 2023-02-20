function calculateAge(date) {
    // your code
    let dateSplit = date.split("/");
    let year = dateSplit[2];
    let month = Number(dateSplit[1]) < 10 ? `0${dateSplit[1]}` : `${dateSplit[1]}`;
    let day = Number(dateSplit[0]) < 10 ? `0${dateSplit[0]}` : `${dateSplit[0]}`;
    let dateNewFormat = `${year}-${month}-${day}`
    // To use Date() function, date in format YYYY-MM-DD
    let birthday = new Date(dateNewFormat);
    let today = new Date();
    let ageInMilliseconds = today - birthday;
    let ageInYears = Math.floor(ageInMilliseconds / 31557600000);
    
    return ageInYears;
}

console.log(calculateAge("20/7/2002") === 20);
console.log(calculateAge("1/1/1979") === 44);
