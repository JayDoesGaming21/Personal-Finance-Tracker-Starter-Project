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
    
    //Create new item object
    const cost = {
        name: costName,
        amount: costAmount
    }

    //Add item to items array
    costs.push(cost);

    renderItems();
}

//Function to delete items
function deleteItem(event) {
    if (event.target.classList.contains("delete-btn"))  {

        //Get item index from data-id attribute
        const costIndex = parseInt(event.target.getAttribute("data-id"));

        //Remove item from item array
        costs.splice(costIndex, 1);

        //Render items
        renderItems();
    }
}

//Add event listeners
costForm.addEventListener("submit", addExpenses);
costList.addEventListener("click", deleteItem);

//Render initial items on page load
renderItems();