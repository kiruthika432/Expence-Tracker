
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const totalAmountElement = document.getElementById('total-amount');

let expenses = [];

function addExpense() {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());
  const date = expenseDateInput.value;

  if (!name || isNaN(amount) || amount <= 0 || !date) {
    alert('Please fill all fields with valid data.');
    return;
  }

  const expense = { name, amount, date };
  expenses.push(expense);

  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  expenseDateInput.value = '';

  renderExpenses();
}

function renderExpenses() {
  expenseList.innerHTML = '';
  let totalAmount = 0;

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

    totalAmount += expense.amount;
  });

  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

function editExpense(index) {
  const expense = expenses[index];

  // Populate input fields with the selected expense
  expenseNameInput.value = expense.name;
  expenseAmountInput.value = expense.amount;
  expenseDateInput.value = expense.date;

  expenses.splice(index, 1);

  renderExpenses();
}

addExpenseButton.addEventListener('click', addExpense);

renderExpenses();
