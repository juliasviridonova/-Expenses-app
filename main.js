const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";

const inputNode = document.getElementById("expenseInput");
const categorySelectNode = document.getElementById("categorySelect");
const addButtonNode = document.getElementById("addButton");
const clearButtonNode = document.getElementById("clearButton");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyList = document.getElementById("historyList");
const changeLimitBtn = document.getElementById("changeLimitBtn");

const limitNode = document.getElementById("limitValue");
let limit = parseInt(limitNode.innerText);

initLimit();

function initLimit() {
    const limitFromStorage = parseInt(localStorage.getItem("limit"));
    if (!limitFromStorage) {
        return;
    }
    limitNode.innerText = limitFromStorage;
}



let expenses = [];

function getTotal() {
    let sum = 0;
    expenses.forEach(function (expense) {
        sum += expense.amount;
    });
    return sum;
}

function renderStatus() {
    const total = getTotal(expenses);
    totalValueNode.innerText = total;

    if (total <=limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "stats__statusText_positive";
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб)`;
        statusNode.className = "stats__statusText_negative";
    }  
}

function renderHistory() {
    historyList.innerHTML = "";
    expenses.forEach(function (expense) {
        const historyItem = document.createElement("li");

        historyItem.className = "rub";
        historyItem.innerText = `${expense.category} - ${expense.amount}`;
        historyList.appendChild(historyItem);
    });
}

function render() {
    renderStatus();
    renderHistory();
}

function getExpenseFromUser() {
    return parseInt(inputNode.value);
}

function getSelectedCategory() {
    return categorySelectNode.value;
}

const clearInput = (input) => {
    input.value = "";
};

function addButtonHandler() {
    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
        alert("Не выбрана сумма");
        return;
    }

    const currentCategory = getSelectedCategory();
    if (currentCategory === "Категория") {
        alert("Не выбрана категория");
        return;
    }

    const newExpense = { amount: currentAmount, category: currentCategory };
    console.log(newExpense);

    expenses.push(newExpense);
    render();
    clearInput(inputNode);
}

function clearButtonHandler() {
    expenses = [];
    render ();
}

function changeLimitHandler() {
    const CHANGE_LIMIT_TEXT = "Новый лимит";
    const newLimit = prompt(CHANGE_LIMIT_TEXT);

    const newLimitValue = parseInt(newLimit);
    if (!newLimitValue) {
        return;
    }

    limitNode.innerText = newLimitValue;
    limit = newLimitValue;
    localStorage.setItem('limit', newLimitValue);

    render;
}

addButtonNode.addEventListener("click", addButtonHandler);
clearButtonNode.addEventListener("click", clearButtonHandler);
changeLimitBtn.addEventListener("click", changeLimitHandler);