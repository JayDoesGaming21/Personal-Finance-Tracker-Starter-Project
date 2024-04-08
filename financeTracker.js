const costForm = document.getElementById("cost-form");
const incomeForm = document.getElementById("income-form");
const costList = document.getElementById("cost-list");
const incomeList = document.getElementById("income-list");
const totalCostElement = document.getElementById("total-cost");
const totalIncomeElement = document.getElementById("total-income");
const totalRemainingElement = document.getElementById("total-remaining");

//Initialize items array from localStorage
let costs = JSON.parse(localStorage.getItem("costs")) || [];
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

//Initialize totals outside of function
let totalCost = 0;
let totalIncome = 0;
let totalRemaining = 0;

// Function to render costs in tabular form
function renderCosts() {

    //Clear cost list
    costList.innerHTML = "";


    // Loop through costs array and create table rows
    for (let i =0; i < costs.length; i++) {
        const cost = costs[i];
        const costRow = document.createElement("tr");
        costRow.innerHTML = `
        <td>${cost.name}</td>
        <td>$${cost.amount}</td>
        <td class ='delete-btn' data-id="${i}">Delete</td>`;
        
        costList.appendChild(costRow);

        //Update total amount
        totalCost += cost.amount;
    } 

    //Update total amount display and total cost display
    totalCostElement.textContent = totalCost.toFixed(2)
    totalRemaining = totalIncome - totalCost
    totalRemainingElement.textContent = totalRemaining.toFixed(2)

    //Save expenses to localStorage
    localStorage.setItem("costs", JSON.stringify(costs));

}

// Function to render incomes in tabular form
function renderIncomes() {

    //Clear income list
    incomeList.innerHTML = "";

    // Loop through incomes array and create table rows
    for (let i =0; i < incomes.length; i++) {
        const income = incomes[i];
        const incomeRow = document.createElement("tr");
        incomeRow.innerHTML = `
        <td>${income.name}</td>
        <td>$${income.amount}</td>
        <td class ='delete-btn' data-id="${i}">Delete</td>`;
        
        incomeList.appendChild(incomeRow);

        //Update total amount
        totalIncome += income.amount;
    } 

    //Update total amount display and total income display
    totalIncomeElement.textContent = totalIncome.toFixed(2)
    totalRemaining = totalIncome - totalCost
    totalRemainingElement.textContent = totalRemaining.toFixed(2)

    //Save incomes to localStorage
    localStorage.setItem("incomes", JSON.stringify(incomes));

}

// Function to add costs 
function addCosts(event) {
    event.preventDefault();

    totalCost = 0;
    totalCostElement.textContent = totalCost.toFixed(2)

    //Get cost name and add from form
    const costNameInput = document.getElementById("cost-name");
    const costAmountInput = document.getElementById("cost-amount");
    const costName = costNameInput.value;
    const costAmount = parseFloat(costAmountInput.value);

    //clear form inputs
    costNameInput.value = "";
    costAmountInput.value = "";

    //Validate inputs
    if (costName === "" || isNaN(costAmount)) {
        alert("Please enter valid details");
        return
    }
    
    //Create new cost object
    const cost = {
        name: costName,
        amount: costAmount
    }

    //Add cost to costs array
    costs.push(cost);

    renderCosts();
}

// Function to add incomes 
function addIncomes(event) {
    event.preventDefault();

    totalIncome = 0;
    totalIncomeElement.textContent = totalIncome.toFixed(2)

    //Get income name and add from form
    const incomeNameInput = document.getElementById("income-name");
    const incomeAmountInput = document.getElementById("income-amount");
    const incomeName = incomeNameInput.value;
    const incomeAmount = parseFloat(incomeAmountInput.value);

    //clear form inputs
    incomeNameInput.value = "";
    incomeAmountInput.value = "";

    //Validate inputs
    if (incomeName === "" || isNaN(incomeAmount)) {
        alert("Please enter valid details");
        return
    }
    
    //Create new income object
    const income = {
        name: incomeName,
        amount: incomeAmount
    }

    //Add income to incomes array
    incomes.push(income);

    renderIncomes();
}

//Function to delete costs
function deleteCost(event) {

    totalCost = 0;
    totalCostElement.textContent = totalCost.toFixed(2)
    if (event.target.classList.contains("delete-btn"))  {

        //Get cost index from data-id attribute
        const costIndex = parseInt(event.target.getAttribute("data-id"));

        //Remove cost from costs array
        costs.splice(costIndex, 1);

        //Render costs
        renderCosts();
    }
}

//Function to delete incomes
function deleteIncome(event) {

    totalIncome = 0;
    totalIncomeElement.textContent = totalIncome.toFixed(2)
    if (event.target.classList.contains("delete-btn"))  {

        //Get income index from data-id attribute
        const incomeIndex = parseInt(event.target.getAttribute("data-id"));

        //Remove income from incomes array
        incomes.splice(incomeIndex, 1);

        //Render incomes
        renderIncomes();
    }
}

//Add event listeners
costForm.addEventListener("submit", addCosts);
costList.addEventListener("click", deleteCost);
incomeForm.addEventListener("submit", addIncomes);
incomeList.addEventListener("click", deleteIncome);

//Render initial items on page load
renderCosts();
renderIncomes();