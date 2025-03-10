// DOM Elements
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const totalAmountElement = document.getElementById('total-amount');

// Initialize expenses array
let expenses = [];

// Function to add expense
function addExpense() {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());
  const date = expenseDateInput.value;

  // Validate inputs
  if (!name || isNaN(amount) || amount <= 0 || !date) {
    alert('Please fill all fields with valid data.');
    return;
  }

  // Add expense to the array
  const expense = { name, amount, date };
  expenses.push(expense);

  // Clear inputs
  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  expenseDateInput.value = '';

  // Render expenses
  renderExpenses();
}

// Function to render expenses
function renderExpenses() {
  // Clear the list
  expenseList.innerHTML = '';

  // Calculate total amount
  let totalAmount = 0;

  // Render each expense
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name}</span>
      <span>$${expense.amount.toFixed(2)}</span>
      <span>${expense.date}</span>
      <button class="edit" onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);

    // Add to total amount
    totalAmount += expense.amount;
  });

  // Update total amount
  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

// Function to delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Function to edit expense
function editExpense(index) {
  const expense = expenses[index];

  // Populate input fields with the selected expense
  expenseNameInput.value = expense.name;
  expenseAmountInput.value = expense.amount;
  expenseDateInput.value = expense.date;

  // Remove the expense from the list
  expenses.splice(index, 1);

  // Re-render the list
  renderExpenses();
}

// Event listener for add expense button
addExpenseButton.addEventListener('click', addExpense);

// Initial render
renderExpenses();