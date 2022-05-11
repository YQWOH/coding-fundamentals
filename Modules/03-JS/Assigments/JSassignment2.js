function calculateAge(date) 
{
    const bdate = date.split('/');
    const bdate2 = [bdate[1], bdate[0], bdate[2]].join('/');
    const today = new Date();
    const birthDate = new Date(bdate2);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth	();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

console.log(calculateAge("20/7/2002") === 19)
console.log(calculateAge("1/1/1979") === 43)