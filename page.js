function redirectTomain() {
  window.location.href = "main.html";
}

const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  const bookName = document.getElementById("name").value;
  const author = document.getElementById("author").value;
  const publisher = document.getElementById("publisher").value;
  const publicationDate = document.getElementById("publication-date").value;

  const formData = {
    bookName,
    author,
    publisher,
    publicationDate
  };

  let existingFormData = JSON.parse(localStorage.getItem("formData")) || [];

  existingFormData.push(formData);

  // Save the updated form data to local storage
  localStorage.setItem("formData", JSON.stringify(existingFormData));

  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("publisher").value = "";
  document.getElementById("publication-date").value = "";

  // Redirect to main.html
  window.location.href = "main.html";
});

const exitButton = document.querySelector('button[type="exit"]');

exitButton.addEventListener("click", function(event) {
  event.preventDefault(); 
  // Retrieve the form data from local storage
  const formData = JSON.parse(localStorage.getItem("formData"));

  // Reset the form
  bookForm.reset();

  // Clear the form data from local storage
  localStorage.removeItem("formData");
});