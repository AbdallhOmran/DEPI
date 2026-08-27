var carType = "sedan"
var carModel = "2020"
var carPrice = 200000
var downPayment = 15000
var installmentPeriod = 60
var monthlyInstallment
var interestRate = 20*100/200000




var financedAmount = carPrice - downPayment;

var totalInterest = financedAmount * (interestRate / 100) * (installmentPeriod / 12);

var totalAmount = financedAmount + totalInterest;

monthlyInstallment = totalAmount / installmentPeriod;



