class Book {
  constructor(title, author, isbn) {
    (this.title = title), (this.author = author), (this.isbn = isbn);
  }
}

class UI {
  addBookToList(book) {
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
  }
  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Local storage class

class Store {
  //Checks to see if local storage is empty, if so create a blank books[]
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  //Loops through the local storage and forEach element, it will create a html element to
  //display the books
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  //First loads the books from local storage
  //Then appends/pushes the book to the books array
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  //This will take in an ISBN value from the e.target from the event listner
  //Then with a string of poscursers, the isbn of that element is returned

  //Then for each value in the books array, once a matching ISBN has been found that element
  //spliced out
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//dom load event to display books in local storage
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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
    //add to local storage
    //No need to instantiate this as the method is static
    Store.addBook(book);

    ui.showAlert("The book has been succesfully added", "success");
    ui.clearFields();
  }
});

//Event listner for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  //This removeBook(element) shows that the emelement within the dom can have a string of dot methods
  //And will still return the correct value
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert("Book removed", "success");

  e.preventDefault;
});
