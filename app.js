//Create constructors
//Book Constructor
function Book(title, author, isbn) {
  (this.title = title), (this.author = author), (this.isbn = isbn);
}

//UI Constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");

  //create tr element
  const row = document.createElement("tr");
  //insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>
  `;

  list.appendChild(row);
};
//show alert
UI.prototype.showAlert = function(message, className) {
  //create div
  const div = document.createElement("div");
  //add class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".container");
  console.log("container: ", container);
  const form = document.getElementById("book-form");
  console.log("form: ", form);

  container.insertBefore(div, form);

  //timeout after 3 seconds
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//eventListners

document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();

  //Gets form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();
  if (title === "" || author === "" || isbn === "") {
    //error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //add book to list
    ui.addBookToList(book);
    ui.showAlert("The book has been succesfully added", "success");
    ui.clearFields();
  }
});

//Event listner for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert("Book removed", "success");

  e.preventDefault;
});
