const costForm = document.getElementById("cost-form");
const costList = document.getElementById("cost-list");
const totalAmountElement = document.getElementById("total-amount");

//Initialize items array from localStorage
let costs = JSON.parse(localStorage.getItem("costs")) || [];

// Function to render expenses in tabular form
function renderItems() {

    //Clear expense list
    costList.innerHTML = "";

    //Initialize total amount
    let totalAmount = 0;

    // Loop through items array and create table rows
    for (let i =0; i < costs.length; i++) {
        const cost = costs[i];
        const costRow = document.createElement("tr");
        costRow.innerHTML = `
        <td>${cost.name}</td>
        <td>$${cost.amount}</td>
        <td class ='delete-btn' data-id="${i}">Delete</td>`;
        
        costList.appendChild(costRow);

        //Update total Amount
        totalAmount += cost.amount;
    } 

    //Update total amount display
    totalAmountElement.textContent = totalAmount.toFixed(2)

    //Save expenses to localStorage
    localStorage.setItem("costs", JSON.stringify(costs));

}

// Function to add expense 
function addExpenses(event) {
    event.preventDefault();

    //Get expense name and add from form
    const itemNameInput = document.getElementById("cost-name");
    const itemAmountInput = document.getElement

}