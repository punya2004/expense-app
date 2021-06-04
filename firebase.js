function getDocuments() {
  db.collection("expenses")
    .orderBy("createdAt", "desc")
    .onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
  
        if (doc.id === "total") {
  
          headingEl.textContent = "Total Expense: " + doc.data().total;
        } else {
          documents.push({
            ...doc.data(),
            docId: doc.id,
          });
        }
        renderList(documents);
      });
    });
}

function deleteFromFirebase(docId, expense) {
  db.collection("expenses")
    .doc(docId)
    .delete()
    .then(() => {
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  db.collection("expenses")
    .doc("total")
    .update({
      total: firebase.firestore.FieldValue.increment(expense),
    });
}

function addExpenseOnFirestore(textDesc, expense) {

  if(textDesc.trim().length!==0 && !isNaN(expense) ){
  db.collection("expenses")
    .add({
      desc: textDesc,
      amount: expense,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  
  db.collection("expenses")
    .doc("total")
    .update({
      total: firebase.firestore.FieldValue.increment(expense),
    });

  }
}
