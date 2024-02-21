var publisherData = {};

function getpublisherData() {
  var storedFormData = localStorage.getItem("formData");
  if (storedFormData) {
    var formData = JSON.parse(storedFormData);
    publisherData = {}; // Reset the publisherData object

    for (var i = 0; i < formData.length; i++) {
      var publisher = formData[i].publisher;
      var numOfBooks = publisherData[publisher] || 0; // Initialize with 0 if publisher doesn't exist
      publisherData[publisher] = numOfBooks + 1; // Increment the number of books by 1
    }

    updateDisplay();
  }
}

function createDeleteHandler(publisher) {
  return function () {
    // Retrieve the existing form data from local storage
    var storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      var formData = JSON.parse(storedFormData);

      // Filter out the record of the specified publisher
      var filteredFormData = formData.filter(function (data) {
        return data.publisher !== publisher;
      });

      // Update the local storage with the filtered form data
      localStorage.setItem("formData", JSON.stringify(filteredFormData));
    }

    // Refresh the publisher data and update the display
    publisherData = {};
    getpublisherData();

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

  for (var publisher in publisherData) {
    if (publisherData.hasOwnProperty(publisher)) {
      var newRow = document.createElement("tr");

      var publisherCell = document.createElement("td");
      publisherCell.textContent = publisher;
      newRow.appendChild(publisherCell);

      var numOfBooksCell = document.createElement("td");
      numOfBooksCell.textContent = publisherData[publisher];
      newRow.appendChild(numOfBooksCell);

      var actionCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", createDeleteHandler(publisher));
      actionCell.appendChild(deleteButton);
      newRow.appendChild(actionCell);

      tableBody.appendChild(newRow);
    }
  }
}

function updateLocalStorage() {
  var formData = [];
  for (var publisher in publisherData) {
    if (publisherData.hasOwnProperty(publisher)) {
      formData.push({
        publisher: publisher,
        numOfBooks: publisherData[publisher].toString()
      });
    }
  }
  localStorage.setItem("formData", JSON.stringify(formData));
}

document.addEventListener("DOMContentLoaded", function () {
  getpublisherData();
});