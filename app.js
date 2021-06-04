const inputElement = document.querySelector("#inputAmount");
const element = document.querySelector("#btnAddExpense");
const signinEl = document.querySelector("#signinLink");
const headingEl = document.querySelector("#headingTotal");
const inputDescEl = document.querySelector("#inputDesc");
const expenseTableEl = document.querySelector("#expenseTable");
const alertEl = document.querySelector("#alert");

let totalExpense = 0;

function addExpenseToTotal() {
  const expenseItem = {};
  const textAmount = inputElement.value;
  const textDesc = inputDescEl.value;

  const expense = parseInt(textAmount, 10);

  expenseItem.desc = textDesc;
  expenseItem.amount = expense;
  expenseItem.moment = new Date();
  
  if (!isNaN(expense)) {
    console.log(expense ,textDesc);
    addExpenseOnFirestore(textDesc, expense);
    inputElement.value = "";
    inputDescEl.value = "";
  }else{
    alert("please Add Amount & Spent On ");
  }
}


function getDateString(momento) {
  return momento.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function deleteItem(docId, amount) {
  deleteFromFirebase(docId, amount);
}

function renderList(arrOfList) {  
  const allExpenseHTML = arrOfList.map((expense) => createListItem(expense));
  const joinedAllExpenseHTML = allExpenseHTML.join("");
  expenseTableEl.innerHTML = joinedAllExpenseHTML;
}

element.addEventListener("click", addExpenseToTotal, false);
getDocuments();


function createListItem({ desc, amount, createdAt, docId }) {
  return `
      <li class="list-group-item list-group-item-primary d-flex justify-content-between">
      <div class="d-flex flex-column">
      ${desc}
          <small class="text-muted">${getDateString(createdAt)}</small>
      </div>
      <div>
          <span class="px-5">
          ${amount}
          </span>
          <button 
            type="button" 
            class="btn btn-outline-danger btn-sm"
            onClick="deleteItem('${docId}', ${amount})"
          >
            <i class="fas fa-trash"></i>
          </button>
      </div>
    </li>
      `;
}