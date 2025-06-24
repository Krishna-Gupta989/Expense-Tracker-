// === FIXED JAVASCRIPT CODE FOR EXPENSE TRACKER (₹ version) ===

let transactions = []; // Use plural name for array

function addTransaction() {
    const description = document.getElementById("description").value; // Fixed typo
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
        description,
        amount,
        type
    };

    transactions.push(transaction); // Push to array

    updateUI();
    updateCharts();
}

function updateUI() {
    const transactionList = document.getElementById("transactions-list");
    const balanceEl = document.getElementById("balance");

    transactionList.innerHTML = "";
    let totalBalance = 0;

    transactions.forEach((txn, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${txn.description} - ₹${txn.amount} <button onclick="removeTransaction(${index})">X</button>`;

        if (txn.type === "income") {
            totalBalance += txn.amount;
            li.style.color = "green";
        } else {
            totalBalance -= txn.amount;
            li.style.color = "red";
        }

        transactionList.appendChild(li);
    });

    balanceEl.innerText = totalBalance;
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
    updateCharts();
}

const ctx = document.getElementById("expense-chart").getContext("2d");
let chart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            label: "Financial Overview",
            data: [0, 0],
            backgroundColor: ["green", "red"],
        }]
    }
});

function updateCharts() {
    let income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    let expense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    chart.data.datasets[0].data = [income, expense];
    chart.update();
}
