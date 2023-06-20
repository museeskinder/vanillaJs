const balance = document.getElementById('balance');
const income = document.querySelector('.container .income-expense .income .income-value');
const expense = document.querySelector('.container .income-expense .expense .expense-value');
const history = document.querySelector('.container .history');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const btn = document.getElementById('btn');
const error = document.getElementById('error');

let storeIncome = 0, storeExpense = 0, storeBalance = 0;

btn.addEventListener('click', () => {
    updateAll(Number(amount.value));
})

const updateAll = (num) => {
    if(!Number.isNaN(num)) {
        error.innerText = '';
        if(num < 0)
            storeExpense += num;
        else
            storeIncome += num;
        storeBalance += storeIncome + storeExpense;
        income.innerText = `$${storeIncome}`;
        expense.innerText = `$${storeExpense}`;
        balance.innerText = `$${storeBalance}`;
    } 
    else
        error.innerText = '*please enter number';
}
