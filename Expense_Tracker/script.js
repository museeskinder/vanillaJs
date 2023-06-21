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
    updateHistory(text.value, Number(amount.value));
    text.value = '';
    amount.value = '';
})

const updateAll = (num) => {
    if (!Number.isNaN(num)) {
        error.innerText = '';
        if (num < 0)
            storeExpense += num;
        else
            storeIncome += num;
        storeBalance = storeIncome + storeExpense;
        income.innerText = `$${storeIncome}`;
        expense.innerText = `$${storeExpense}`;
        balance.innerText = `$${storeBalance}`;
    }
    else
        error.innerText = '*please enter number';
}

const updateHistory = (text, num) => {
    let isGreen;
    if (num > 0)
        isGreen = 'green';
    else
        isGreen = 'red';
    history.appendChild(historyChild(text, num, isGreen));
}

const historyChild = (text, num, color) => {

    // creating elements
    const item = document.createElement('div');
    const itemName = document.createElement('p');
    const colorDiv = document.createElement('div');
    const value = document.createElement('p');
    const colorValue = document.createElement('div');

    // adding class name
    item.className = 'item fb';
    itemName.className = 'item-name';
    colorDiv.className = 'color-div';
    value.className = 'value';
    colorValue.className = `color ${color}`;

    // setting value
    itemName.innerText = `${text}`;
    value.innerText = `${num}`;


    // putting them together
    item.appendChild(itemName);
    colorDiv.appendChild(value);
    colorDiv.appendChild(colorValue);
    item.appendChild(colorDiv);

    // returning element with specified values as parameter
    return item;
}

console.log(text.value)
console.log(Number(amount.value));