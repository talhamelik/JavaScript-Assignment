var authorData = {};

function getAuthorData() {
  var storedFormData = localStorage.getItem("formData");
  if (storedFormData) {
    var formData = JSON.parse(storedFormData);
    authorData = {}; // Reset the authorData object

    for (var i = 0; i < formData.length; i++) {
      var author = formData[i].author;
      var numOfBooks = authorData[author] || 0; // Initialize with 0 if author doesn't exist
      authorData[author] = numOfBooks + 1; // Increment the number of books by 1
    }

    updateDisplay();
  }
}

function createDeleteHandler(author) {
  return function () {
    // Retrieve the existing form data from local storage
    var storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      var formData = JSON.parse(storedFormData);

      // Filter out the record of the specified author
      var filteredFormData = formData.filter(function (data) {
        return data.author !== author;
      });

      // Update the local storage with the filtered form data
      localStorage.setItem("formData", JSON.stringify(filteredFormData));
    }

    // Refresh the author data and update the display
    authorData = {};
    getAuthorData();

    // Add hover effect to the delete button
    var deleteButtons = document.getElementsByClassName("delete-button");
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].classList.add("hover-effect");
    }
  };
}

function updateDisplay() {
  var tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  for (var author in authorData) {
    if (authorData.hasOwnProperty(author)) {
      var newRow = document.createElement("tr");

      var authorCell = document.createElement("td");
      authorCell.textContent = author;
      newRow.appendChild(authorCell);

      var numOfBooksCell = document.createElement("td");
      numOfBooksCell.textContent = authorData[author];
      newRow.appendChild(numOfBooksCell);

      var actionCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", createDeleteHandler(author));
      actionCell.appendChild(deleteButton);
      newRow.appendChild(actionCell);

      tableBody.appendChild(newRow);
    }
  }
}

function updateLocalStorage() {
  var formData = [];
  for (var author in authorData) {
    if (authorData.hasOwnProperty(author)) {
      formData.push({
        author: author,
        numOfBooks: authorData[author].toString()
      });
    }
  }
  localStorage.setItem("formData", JSON.stringify(formData));
}

document.addEventListener("DOMContentLoaded", function () {
  getAuthorData();
});