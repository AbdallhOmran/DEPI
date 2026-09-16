var x = 7
var y = 5

/*
Function = Method
Variable = Property
*/

function sum (fNum, sNum){
    var summation = fNum + sNum 
    return summation
    // console.log('Summation: ' + summation)
}

function sub (fNumber, sNumber){
    var subtraction = fNumber - sNumber 
    return subtraction
    // console.log('Subtraction: ' + subtraction)
}

function mul (fNum, sNum){
    var multiplication = fNum * sNum 
    return multiplication
    // console.log('Multiplication: ' + multiplication)
}

function div (fNum, sNum){
    var division = fNum / sNum 
    return division
    // console.log('Division: ' + division)
}


console.log( sum(50, 49) ) 
console.log( sum(x, y) ) 
console.log('Summation: ' + sum(1589, 2548) )
var t = sum(6, 7)
var r = sub(281, 29) + mul(19, 68)
var h = t + r
var w = div(27, 7) + mul(67, 167) + h + sub(9789, 2124)
console.log('Final Result: ' + w)


console.log('---------*****************-----------------')
/* Exercise One */
var employeeName = 'Nader'
var employeeBasicSalary = 7000
var employeeBonus = 680
var employeePenalties = 340
var taxRate = 0.2
var extraHours = 9
var employeeJobTitle = 'Salesman'

/*
8 Hours Per Day
5 Days Per Week
4 Weeks Per Month
*/
function monthlyHours(hoursPerDay, daysPerWeek, weeksPerMonth){
    var totalMonthlyHours = hoursPerDay * daysPerWeek * weeksPerMonth
    return totalMonthlyHours
}

function hourlyRate(bSalary, monthlyHours){
    var hourlyRate = bSalary / monthlyHours
    return hourlyRate
}

function extraValue(eHours, hourValue, jobTitle){
    /*    
    Operator => 
        HourlyRate = 10 => Extra Hour = 10
    Salesman => 
        HourlyRate = 10 => Extra Hour = 15
    Admin => 
        HourlyRate = 10 => Extra Hour = 20
    Other => 
        HourlyRate = 10 => Extra Hour = 0
    */
    var extraValue = eHours * hourValue
    return extraValue
}

function grossSalary(bSalary, bonus, extra, penalty){
    var grossSalary = bSalary + bonus + extra - penalty
    return grossSalary
}

function taxes(gross, rate){
    var taxValue = gross * rate
    return taxValue    
}

function net(gross, taxes){
    var netSalary = gross - taxes
    return netSalary
}



var empMonthlyHours = monthlyHours(8, 5, 4)
var empHourValue = hourlyRate(employeeBasicSalary, empMonthlyHours)
var empExtraHours = extraValue(extraHours, empHourValue)
var empGrossSalary = grossSalary(employeeBasicSalary, employeeBonus, empExtraHours, employeePenalties)
var empTaxes = taxes(empGrossSalary, taxRate)
var empNetSalary = net(empGrossSalary, empTaxes)



console.log('Total Monthly Hours: ' + empMonthlyHours)
console.log('Hourly Rate: ' + empHourValue)
console.log('Extra Hours: ' + empExtraHours)
console.log('Gross Salary: ' + empGrossSalary)
console.log('Taxes: ' + empTaxes)
console.log('Net Salary: ' + empNetSalary)