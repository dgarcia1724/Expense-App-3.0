// Budget
const inputTotalAmount = document.querySelector(".one input");
const btnSetBudget = document.querySelector(".setBudgetBtn");

// Expenses
const inputTitleProduct = document.querySelector(".inputTitleProduct");
const inputCostProduct = document.querySelector(".inputCostProduct");
const btnCheckAmount = document.querySelector(".checkAmountBtn");
const updateBtn = document.querySelector(".updateBtn");

// 3 columns
const displayTotalBudget = document.querySelector(".displayTotalBudget");
const displayExpenses = document.querySelector(".displayExpenses");
const displayBalance = document.querySelector(".displayBalance");

// List
const newList = document.querySelector(".newList");

// Variables
let currentTotalBudget = 0;
let currentExpenses = 0;
let currentBalance = 0;

const updateColumns = function () {
  currentBalance = currentTotalBudget - currentExpenses;

  displayTotalBudget.innerHTML = currentTotalBudget;
  displayExpenses.innerHTML = currentExpenses;
  displayBalance.innerHTML = currentBalance;
};

// Enter for Budget
inputTotalAmount.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSetBudget.click();
  }
});

btnSetBudget.addEventListener("click", function () {
  if (inputTotalAmount.value >= 0) {
    currentTotalBudget = Number(inputTotalAmount.value);
    updateColumns();
  }
});

// Enter for Expenses
inputTitleProduct.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnCheckAmount.click();
  }
});
inputCostProduct.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnCheckAmount.click();
  }
});

btnCheckAmount.addEventListener("click", function () {
  if (
    !inputTitleProduct.value == "" &&
    inputCostProduct.value >= 0 &&
    !inputCostProduct.value == ""
  ) {
    currentExpenses += Number(inputCostProduct.value);
    updateColumns();

    // update List
    newList.innerHTML += `
  <div class='listItem' id='item${Date.now()}'>
    <span class='itemTitle'>${inputTitleProduct.value}</span>
    <span class='itemCost'>${inputCostProduct.value}</span>
    <button class='edit'>Edit</button>
    <button class='updateBtn'>Update</button>
    <button class='deleteX'>X</button>
  </div>
`;

    const listItem = document.querySelectorAll(".listItem");
    const itemDelete = document.querySelectorAll(".deleteX");
    const edit = document.querySelectorAll(".edit");

    // Delete individual
    for (let i = 0; i < listItem.length; i++) {
      listItem[i]
        .querySelector(".deleteX")
        .addEventListener("click", function () {
          currentExpenses -= Number(
            listItem[i].querySelector(".itemCost").innerHTML
          );

          updateColumns();
          listItem[i].remove();
        });
    }
    // Delete individual
    // Edit Individual
    for (let i = 0; i < listItem.length; i++) {
      listItem[i].querySelector(".edit").addEventListener("click", function () {
        // Subtract item Expense
        const currentItemExpenseLol = Number(
          listItem[i].querySelector(".itemCost").innerHTML
        );
        // MINUS
        console.log("one minus", currentExpenses);
        currentExpenses -= currentItemExpenseLol;
        console.log("two minus", currentExpenses);
        updateColumns();

        const currentItemTitleLol =
          listItem[i].querySelector(".itemTitle").innerHTML;

        // Add Title Input
        listItem[i].querySelector(".itemTitle").innerHTML = `
          <input type='text' class='updateTitle'>
        `;
        listItem[i].querySelector(".updateTitle").value = currentItemTitleLol;
        // Add Cost Input
        listItem[i].querySelector(".itemCost").innerHTML = `
          <input type='text' class='updateCost'>
        `;

        listItem[i].querySelector(".updateCost").value = currentItemExpenseLol;

        // remove edit, add update Btn
        listItem[i].querySelector(".edit").style.display = "none";
        listItem[i].querySelector(".updateBtn").style.display = "block";

        // disable delete button
        listItem[i].querySelector(".deleteX").disabled = true;

        // Update Button
        listItem[i]
          .querySelector(".updateBtn")
          .addEventListener("click", function () {
            if (
              !listItem[i].querySelector(".updateTitle").value == "" &&
              listItem[i].querySelector(".updateCost").value >= 0 &&
              !listItem[i].querySelector(".updateCost").value == ""
            ) {
              console.log("one plus", currentExpenses);
              // PLUS
              currentExpenses += Number(
                listItem[i].querySelector(".updateCost").value
              );
              updateColumns();
              console.log("two plus", currentExpenses);

              // Get rid of inputs
              listItem[i].querySelector(".itemTitle").innerHTML =
                listItem[i].querySelector(".updateTitle").value;
              listItem[i].querySelector(".itemCost").innerHTML =
                listItem[i].querySelector(".updateCost").value;

              // remove update Btn, add Edit
              listItem[i].querySelector(".edit").style.display = "block";
              listItem[i].querySelector(".updateBtn").style.display = "none";

              // enable delete button
              listItem[i].querySelector(".deleteX").disabled = false;
            }
          });
        // Update Button
      });
      // Edit Individual
    }
  }
});
