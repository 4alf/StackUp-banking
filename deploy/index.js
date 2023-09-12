class BankAccount {
    constructor(holder, type) {
        this.accountHolder = holder;
        this.accountType = type;
        this.balance = 1000; // Initial balance
        this.transactionHistory = [];
    }

    deposit(amount) {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Invalid input. Please enter a valid amount.");
        }

        this.balance += amount;
        this.transactionHistory.push({ type: "Deposit", amount, date: new Date() });
    }

    withdraw(amount) {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Invalid input. Please enter a valid amount.");
        }

        if (amount > this.balance) {
            throw new Error("Insufficient funds for withdrawal.");
        }

        this.balance -= amount;
        this.transactionHistory.push({ type: "Withdrawal", amount, date: new Date() });
    }
}

const account = new BankAccount("John Doe", "Savings");

document.getElementById("deposit").addEventListener("click", () => {
    try {
        const amount = parseFloat(document.getElementById("amount").value);
        account.deposit(amount);
        updateAccountDetails();
        showMessage("Deposit successful.");
    } catch (error) {
        showMessage(error.message, true);
    } finally {
        document.getElementById("amount").value = ""; // Clear the input field
    }
});

document.getElementById("withdraw").addEventListener("click", () => {
    try {
        const amount = parseFloat(document.getElementById("amount").value);
        account.withdraw(amount);
        updateAccountDetails();
        showMessage("Withdrawal successful.");
    } catch (error) {
        showMessage(error.message, true);
    } finally {
        document.getElementById("amount").value = ""; // Clear the input field
    }
});

function updateAccountDetails() {
    document.getElementById("accountHolder").textContent = account.accountHolder;
    document.getElementById("accountType").textContent = account.accountType;
    document.getElementById("balance").textContent = account.balance.toFixed(2);
    displayTransactionHistory();
}

function showMessage(message, isError = false) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.color = isError ? "red" : "#007bff";
}

function displayTransactionHistory() {
    const historyList = document.getElementById("transactionHistory");
    historyList.innerHTML = "";

    account.transactionHistory.forEach((transaction) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.type}: $${transaction.amount.toFixed(2)} - ${transaction.date.toLocaleString()}`;
        historyList.appendChild(listItem);
    });
}
