const expenseName = document.getElementById("expenseName");

const expenseAmount = document.getElementById("expenseAmount");

const expenseCategory =
    document.getElementById("expenseCategory");

const addExpenseBtn =
    document.getElementById("addExpenseBtn");

const expenseList =
    document.getElementById("expenseList");

const totalAmount =
    document.getElementById("totalAmount");

const totalEntries =
    document.getElementById("totalEntries");

const emptyMessage =
    document.getElementById("emptyMessage");

const clearAllBtn =
    document.getElementById("clearAllBtn");

const copyright =
    document.getElementById("copyright");


let expenses =
    JSON.parse(
        localStorage.getItem("preetiExpenses")
    ) || [];


// Save expenses
function saveExpenses() {

    localStorage.setItem(
        "preetiExpenses",
        JSON.stringify(expenses)
    );

}


// Show expenses
function showExpenses() {

    expenseList.innerHTML = "";


    expenses.forEach(function(expense) {

        const li =
            document.createElement("li");

        li.className = "expense-item";


        const details =
            document.createElement("div");

        details.className = "expense-details";


        const name =
            document.createElement("p");

        name.className = "expense-name";

        name.textContent = expense.name;


        const category =
            document.createElement("p");

        category.className = "expense-category";

        category.textContent =
            expense.category;


        details.appendChild(name);

        details.appendChild(category);


        const amount =
            document.createElement("span");

        amount.className = "expense-amount";

        amount.textContent =
            "₹" + expense.amount;


        const deleteButton =
            document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";


        // Delete expense

        deleteButton.addEventListener(
            "click",
            function() {

                expenses =
                    expenses.filter(
                        function(item) {

                            return item.id !== expense.id;

                        }
                    );


                saveExpenses();

                showExpenses();

            }
        );


        li.appendChild(details);

        li.appendChild(amount);

        li.appendChild(deleteButton);


        expenseList.appendChild(li);

    });


    updateSummary();

}


// Update total
function updateSummary() {

    let total = 0;


    expenses.forEach(function(expense) {

        total += Number(expense.amount);

    });


    totalAmount.textContent =
        "₹" + total.toLocaleString("en-IN");


    totalEntries.textContent =
        expenses.length;


    if (expenses.length === 0) {

        emptyMessage.style.display =
            "block";

    } else {

        emptyMessage.style.display =
            "none";

    }

}


// Add expense
function addExpense() {

    const name =
        expenseName.value.trim();

    const amount =
        expenseAmount.value;

    const category =
        expenseCategory.value;


    if (
        name === "" ||
        amount === "" ||
        category === ""
    ) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


    const newExpense = {

        id: Date.now(),

        name: name,

        amount: Number(amount),

        category: category

    };


    expenses.push(newExpense);


    expenseName.value = "";

    expenseAmount.value = "";

    expenseCategory.value = "";


    saveExpenses();

    showExpenses();

}


// Add button
addExpenseBtn.addEventListener(
    "click",
    addExpense
);


// Clear all
clearAllBtn.addEventListener(
    "click",
    function() {

        if (expenses.length === 0) {

            return;

        }


        const confirmDelete =
            confirm(
                "Are you sure you want to delete all expenses?"
            );


        if (confirmDelete) {

            expenses = [];

            saveExpenses();

            showExpenses();

        }

    }
);


// Current year
copyright.textContent =
    "© " +
    new Date().getFullYear() +
    " Preeti Chand. All Rights Reserved.";


// Load expenses
showExpenses();