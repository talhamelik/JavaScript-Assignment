function start() {
  // Retrieve data from local storage
  var bookData = getDataFromLocalStorage();
  
  // Display the data on the page
  displayBookData(bookData);
}

// Call the start function when the page loads
window.addEventListener("load", start);

function getDataFromLocalStorage() {
  var storedData = localStorage.getItem("formData"); // Use "formData" to match page.js
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return [];
  }
}

function displayBookData(bookData) {
  var tableBody = document.getElementById("table-body");

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Loop through the book data and create rows dynamically
  bookData.forEach(function (book, index) {
    // Create a new row for each book
    var row = document.createElement("tr");

    // Create cells for each data field

    var numberCell = document.createElement("td");
    numberCell.textContent = index + 1; // Show the index of the book
    row.appendChild(numberCell);

    var bookNameCell = document.createElement("td");
    bookNameCell.textContent = book.bookName;
    row.appendChild(bookNameCell);

    var authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    var publisherCell = document.createElement("td");
    publisherCell.textContent = book.publisher;
    row.appendChild(publisherCell);

    var dateCell = document.createElement("td");
    dateCell.textContent = book.publicationDate;
    row.appendChild(dateCell);

    var actionsCell = document.createElement("td");

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "action-button";
    deleteButton.addEventListener("click", function () {
      deleteRow(this);
    });
    actionsCell.appendChild(deleteButton);

    var updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.className = "action-button";
    updateButton.addEventListener("click", function () {
      updateRow(this);
    });
    actionsCell.appendChild(updateButton);

    row.appendChild(actionsCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Function to delete a row
function deleteRow(button) {
  var row = button.parentNode.parentNode;
  var tableBody = row.parentNode;
  tableBody.removeChild(row);

  // Update the data in local storage after deletion
  var updatedBookData = retrieveBookDataFromTable();
  updateDataInLocalStorage(updatedBookData);
}

// Function to update a row
function updateRow(button) {
  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");

  // Get the current values of the cells
  var currentBookName = cells[1].textContent;
  var currentAuthor = cells[2].textContent;
  var currentPublisher = cells[3].textContent;
  var currentDate = cells[4].textContent;

  // Create input fields for editing
  var bookNameInput = document.createElement("input");
  bookNameInput.type = "text";
  bookNameInput.value = currentBookName;

  var authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.value = currentAuthor;

  var publisherInput = document.createElement("input");
  publisherInput.type = "text";
  publisherInput.value = currentPublisher;

  var dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = currentDate;

  // Replace the text content with input fields
  cells[1].textContent = "";
  cells[1].appendChild(bookNameInput);

  cells[2].textContent = "";
  cells[2].appendChild(authorInput);

  cells[3].textContent = "";
  cells[3].appendChild(publisherInput);

  cells[4].textContent = "";
  cells[4].appendChild(dateInput);

  // Create save button
  var saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "action-button";
  saveButton.addEventListener("click", function () {
    saveRow(this);
  });

  // Create cancel button
  var cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.className = "action-button";
  cancelButton.addEventListener("click", function () {
    cancelEditRow(this, currentBookName, currentAuthor, currentPublisher, currentDate);
  });

  // Remove the update and delete buttons
  cells[5].innerHTML = "";
  cells[5].appendChild(saveButton);
  cells[5].appendChild(cancelButton);
}

// Function to save the edited row
function saveRow(button) {
  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");

  // Get the edited values from the input fields
  var updatedBookName = cells[1].getElementsByTagName("input")[0].value;



  var updatedAuthor = cells[2].getElementsByTagName("input")[0].value;
  var updatedPublisher = cells[3].getElementsByTagName("input")[0].value;
  var updatedDate = cells[4].getElementsByTagName("input")[0].value;

  // Update the text content of the cells with the edited values
  cells[1].textContent = updatedBookName;
  cells[2].textContent = updatedAuthor;
  cells[3].textContent = updatedPublisher;
  cells[4].textContent = updatedDate;

  // Create an object with the updated book data
  var updatedBookData = {
    number: cells[0].textContent,
    bookName: updatedBookName,
    author: updatedAuthor,
    publisher: updatedPublisher,
    publicationDate: updatedDate
  };

  // Update the data in local storage after editing
  var bookData = retrieveBookDataFromTable();
  var updatedData = updateDataInLocalStorage(bookData, updatedBookData);

  // Remove the save and cancel buttons
  cells[5].innerHTML = "";

  // Restore the delete and update buttons
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "action-button";
  deleteButton.addEventListener("click", function () {
    deleteRow(this);
  });
  cells[5].appendChild(deleteButton);

  var updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.className = "action-button";
  updateButton.addEventListener("click", function () {
    updateRow(this);
  });
  cells[5].appendChild(updateButton);
}

// Function to cancel editing and restore the original values
function cancelEditRow(button, currentBookName, currentAuthor, currentPublisher, currentDate) {
  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");

  // Restore the original text content
  cells[1].textContent = currentBookName;
  cells[2].textContent = currentAuthor;
  cells[3].textContent = currentPublisher;
  cells[4].textContent = currentDate;

  // Remove the save and cancel buttons
  cells[5].innerHTML = "";

  // Restore the delete and update buttons
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "action-button";
  deleteButton.addEventListener("click", function () {
    deleteRow(this);
  });
  cells[5].appendChild(deleteButton);

  var updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.className = "action-button";
  updateButton.addEventListener("click", function () {
    updateRow(this);
  });
  cells[5].appendChild(updateButton);
}

// Function to retrieve book data from the table
function retrieveBookDataFromTable() {
  var rows = document.getElementById("table-body").getElementsByTagName("tr");
  var bookData = [];

  // Loop through the rows and extract the data from the cells
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var book = {
      number: cells[0].textContent,
      bookName: cells[1].textContent,
      author: cells[2].textContent,
      publisher: cells[3].textContent,
      publicationDate: cells[4].textContent
    };
    bookData.push(book);
  }

  return bookData;
}

// Function to update the data in local storage
function updateDataInLocalStorage(bookData, updatedBookData, rowIndex) {
  var updatedData = bookData.map(function (book, index) {
    if (index === rowIndex) {
      return updatedBookData;
    } else {
      return book;
    }
  });
  function displayBookData(bookData) {
  var tableBody = document.getElementById("table-body");

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Loop through the book data and create rows dynamically
  bookData.forEach(function (book, index) {
    // Create a new row for each book
    var row = document.createElement("tr");
    // Create cells for each data field

    var numberCell = document.createElement("td");
    numberCell.textContent = index + 1; // Show the index of the book
    row.appendChild(numberCell);

    var bookNameCell = document.createElement("td");
    bookNameCell.textContent = book.bookName;
    row.appendChild(bookNameCell);

    var authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    var publisherCell = document.createElement("td");
    publisherCell.textContent = book.publisher;
    row.appendChild(publisherCell);

    var dateCell = document.createElement("td");
    dateCell.textContent = book.publicationDate;
    row.appendChild(dateCell);

    var actionsCell = document.createElement("td");

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "action-button";
    deleteButton.addEventListener("click", function () {
      deleteRow(this);
    });
    actionsCell.appendChild(deleteButton);

    var updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.className = "action-button";
    updateButton.addEventListener("click", function () {
      updateRow(this);
    });
    actionsCell.appendChild(updateButton);

    row.appendChild(actionsCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

  localStorage.setItem("formData", JSON.stringify(updatedData));

  return updatedData;
}