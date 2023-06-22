const balance = document.getElementById('balance');
const income = document.querySelector('.container .income-expense .income .income-value');
const expense = document.querySelector('.container .income-expense .expense .expense-value');
const history = document.querySelector('.container .history');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const btn = document.getElementById('btn');
const error = document.getElementById('error');

let storeIncome = 0, storeExpense = 0, storeBalance = 0;

//writing new values on DOM
const writeValues = (incomeValue, expenseValue) => {
        storeBalance = incomeValue + expenseValue;
        income.innerText = `$${incomeValue}`;
        expense.innerText = `$${expenseValue}`;
        balance.innerText = `$${storeBalance}`;
}

//update functions
const updateAll = (num) => {
    if (!Number.isNaN(num)) {
        error.innerText = '';
        if (num < 0)
            storeExpense += num;
        else
            storeIncome += num;
        writeValues(storeIncome, storeExpense);
    }
    else
        error.innerText = '*please enter number';
}

const updateHistory =  (text, num) => {
    let isGreen;
    if (num > 0)
        isGreen = 'green';
    else
        isGreen = 'red';
    if(!Number.isNaN(num))
       history.appendChild(historyChild(text, num, isGreen));
}

const removeHistory = (child) => {
    
    const childText = (child.querySelector('.item-name')).innerText;
    const childValue = Number((child.querySelector('.color-div .value')).innerText);
    if(childValue > 0)
        storeIncome -= childValue;
    else    
        storeExpense -= childValue;
    history.removeChild(child);
    writeValues(storeIncome, storeExpense);
};

//element appended in history
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

//event listeners
btn.addEventListener('click', () => {
    updateAll(Number(amount.value));
    updateHistory(text.value, Number(amount.value));
    text.value = '';
    amount.value = '';
})

history.addEventListener('click', (e) => {
    if(e.target.className.includes('item fb'))
        removeHistory(e.target);
}) 



