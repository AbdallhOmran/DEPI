// Get elements
const carType = document.getElementById("carType");
const carModel = document.getElementById("carModel");
const carPrice = document.getElementById("carPrice");
const downPayment = document.getElementById("downPayment");

const periodButtons = document.querySelectorAll(".period");
const calculateBtn = document.querySelector(".calculate-btn");

// Result elements
const monthlyPayment = document.querySelector(".main-result h3");
const interestRateResult = document.querySelector(".result-item:nth-child(1) strong");
const financedAmountResult = document.querySelector(".result-item:nth-child(2) strong");
const totalInterestResult = document.querySelector(".result-item:nth-child(3) strong");
const totalAmountResult = document.querySelector(".result-item:nth-child(4) strong");


// Default installment period
let selectedPeriod = 1;


// Select installment period
periodButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active from all buttons
        periodButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        button.classList.add("active");

        // Get selected years
        selectedPeriod = Number(button.querySelector("strong").textContent);

    });

});


// Calculate
calculateBtn.addEventListener("click", function () {

    const price = Number(carPrice.value);
    const payment = Number(downPayment.value);

    // Validation
    if (price <= 0) {
        alert("Please enter a valid car price.");
        return;
    }

    if (payment < 0) {
        alert("Down payment cannot be negative.");
        return;
    }

    if (payment >= price) {
        alert("Down payment must be less than the car price.");
        return;
    }


    // Amount that will be financed
    const financedAmount = price - payment;


    // Interest rate depending on installment period
    let interestRate;

    if (selectedPeriod === 1) {
        interestRate = 10;
    } else if (selectedPeriod === 2) {
        interestRate = 11;
    } else if (selectedPeriod === 3) {
        interestRate = 12;
    } else if (selectedPeriod === 4) {
        interestRate = 13;
    } else {
        interestRate = 14;
    }


    // Simple interest calculation
    const totalInterest =
        financedAmount * (interestRate / 100) * selectedPeriod;


    // Total amount after interest
    const totalAmount =
        financedAmount + totalInterest;


    // Number of months
    const months =
        selectedPeriod * 12;


    // Monthly payment
    const monthlyPaymentValue =
        totalAmount / months;


    // Update UI
    monthlyPayment.textContent =
        `EGP ${monthlyPaymentValue.toLocaleString("en-US", {
            maximumFractionDigits: 2
        })}`;

    interestRateResult.textContent =
        `${interestRate}%`;

    financedAmountResult.textContent =
        `EGP ${financedAmount.toLocaleString("en-US")}`;

    totalInterestResult.textContent =
        `EGP ${totalInterest.toLocaleString("en-US", {
            maximumFractionDigits: 2
        })}`;

    totalAmountResult.textContent =
        `EGP ${totalAmount.toLocaleString("en-US", {
            maximumFractionDigits: 2
        })}`;

});