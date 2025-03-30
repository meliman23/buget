// Get all necessary elements
const moneyInput = document.getElementById('moneyInput')
const displaymoney = document.getElementsByClassName('displaymoney');

const incomeInput = document.getElementById('incomeInput');
const displayIncomeElements = document.getElementsByClassName('displayincome');

const displayCashElements = document.getElementsByClassName('displaycash');
const cashInput = document.querySelector('.cashInput'); // Better way to select

const remainingBalanceDisplay = document.getElementById("remainingBalance");

const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const totalExpensesDisplay = document.getElementById("totalExpenses");

let expenses = [];

// Check if cashInput exists before adding event listener
if (moneyInput) {
    moneyInput.addEventListener("input", function () {
        for (let element of displaymoney) {
            element.textContent = moneyInput.value || 0;
        }
        updateBalance();
    });
} else {
    console.error("Cash input element not found!");
}

// Update displayed income when input changes
incomeInput.addEventListener("input", function () {
    for (let element of displayIncomeElements) {
        element.textContent = incomeInput.value || 0;
    }
    updateBalance();
});

// Add expense to the list
function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({ name, amount });

    renderExpenseList();
    updateBalance();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
}

// Render expense list
function renderExpenseList() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${expense.name}: $${expense.amount.toFixed(2)} 
        <button class="delete-btn" onclick="removeExpense(${index})">❌</button>`;
        expenseList.appendChild(li);
    });
}

// Remove expense
function removeExpense(index) {
    expenses.splice(index, 1);
    renderExpenseList();
    updateBalance();
}

// Update balance
function updateBalance() {
    const income = parseFloat(incomeInput.value) || 0;
    const cash = parseFloat(moneyInput.value) || 0;  // Check if cashInput exists
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
    remainingBalanceDisplay.textContent = (income + cash - totalExpenses).toFixed(2);
}
