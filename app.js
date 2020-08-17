/*
//Solution without Constructors (OOP)

//Adding Event To Elements
function addEvent() {
document.querySelector('.submit').addEventListener('click', addBook);
}

//Adding a New Book
function addBook() {
//Preventing Button from reloading page
event.preventDefault();

//Getting Elements
let table = document.querySelector('tbody');
let inputs = document.querySelectorAll('input');
let tr = document.createElement('tr');

//Running through loop
for(let i = 0 ; i < 3; i++) {
let th = document.createElement('th');
th.innerHTML = inputs[i].value;
tr.appendChild(th);
}

//Adding delete button
addDeleteBtn(tr);

table.appendChild(tr);
document.querySelector('.alert').classList.remove('d-none', 'alert-danger');
document.querySelector('.alert').innerHTML = 'The Book has been added!';
clearAllInputs();
timer();
}

//Adding a separate delete button
function addDeleteBtn(tr) {
  let th = document.createElement('th');
  let del = document.createElement('a');
  del.innerHTML = 'X';
  del.style.cssText = 'background-color:red; color:white;cursor:pointer;padding:10px;';
  del.addEventListener('click', removeBook);
  th.appendChild(del);
  tr.appendChild(th);
}

//Clearing all inputs
function clearAllInputs() {
let inputs = document.querySelectorAll('input');
for(let i = 0 ; i < inputs.length; i++) {
inputs[i].value = '';
}
}

//hiding Alert after a few seconds
function timer() {
window.setTimeout(hideAlert, 1000);
}

function hideAlert() {
document.querySelector('.alert').classList.add('d-none');
}

function timer2() {
window.setTimeout(hideAlert, 300);
document.querySelector('.alert').classList.add('alert-success');
}

function hideAlert2() {
document.querySelector('.alert').classList.add('d-none');
}

//Remove Current Book
function removeBook() {
document.querySelector('.alert').classList.remove('d-none', 'alert-success');
document.querySelector('.alert').classList.add('alert-danger');
document.querySelector('.alert').innerHTML = 'The Book has been removed!';
this.closest('tr').innerHTML = '';
timer2();
}

//Solution with Constructors (OOP)

//Book Class : represents a book
class Book {
constructor(title, author, isbn) {
this.title = title;
this.author = author;
this.isbn = isbn;
}
}

//UI class : handle UI Tasks
class UI {
static displayBooks() {



const books = Store.getBooks();


books.forEach((book) => UI.addBookToList(book));
}

static addBookToList(book) {
const list = document.querySelector('tbody');

const row = document.createElement('tr');
row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
list.appendChild(row);
}

static clearFields(book) {
document.querySelector('.title').value = '';
document.querySelector('.author').value = '';
document.querySelector('.isbn').value = '';
}

static deleteBook(el) {
if(el.classList.contains('delete')) {
el.parentElement.parentElement.remove();
UI.showAlert('Book has been removed', 'danger');
}
}

static showAlert(message, classList) {
let div = document.querySelector('.alert');
div.classList.remove('d-none');
div.classList.add(`alert-${classList}`);
div.innerHTML = message;
window.setTimeout(() => {
document.querySelector('.alert').classList.add('d-none');
document.querySelector('.alert').classList.remove(`alert-${classList}`);
},1000);
}

}

//Store class : Handles storage (Local)
//In local storage only strings can be stored. Objects can't.
class Store {
static getBooks() {
let books;
if(localStorage.getItem('books') === null) {
books = [];
} else {
books = JSON.parse(localStorage.getItem('books'));
}
return books;
}

static addBook(book) {
const books = Store.getBooks();

books.push(book);
localStorage.setItem('books', JSON.stringify(books));
}

static removeBook(isbn) {
const books = Store.getBooks();
books.forEach((book, index) => {
if(book.isbn == isbn) {
books.splice(index, 1);
}
});

localStorage.setItem('books', JSON.stringify(books));
}

}


//Event : Display Books
//When DOM is loaded
//document.addEventListener('DOMContentLoaded', UI.displayBooks());

//Event : Add a book
document.querySelector('form').addEventListener('submit', (e) => {
//Prevent Default
event.preventDefault();

//Get Form Values
const title = document.querySelector('.title').value;
const author = document.querySelector('.author').value;
const isbn = document.querySelector('.isbn').value;


//Validate fields
if(title === '' || author === '' || isbn === '') {
UI.showAlert('Please fill all the fields', 'danger');
} else {

  //Instantiate a book
  const book = new Book(title, author, isbn);

  //Add Book to UI
  UI.addBookToList(book);

  //Add book to storage
  Store.addBook(book);

  //Show Success Message
  UI.showAlert('Book has been added', 'success');

  //Clear All Fields
  UI.clearFields(book);

  //Delete Element
  UI.deleteBook(book);

}

});

//Event : Remove a book
document.querySelector('tbody').addEventListener('click', (e) => {
UI.deleteBook(e.target);
});

*/

//Creating a Book
class Book {
constructor(title, author, isbn) {
this.title = title;
this.author = author;
this.isbn = isbn;
}
}

//Visual Part
class Display {

//Adding a table row with book info
static addBook(book) {
let table = document.querySelector('tbody');
let row = document.createElement('tr');
row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm del">X</a></td>
`;
table.appendChild(row);
}

//clearing all fields
static clearFields() {
  document.querySelector('.title').value = '';
  document.querySelector('.author').value = '';
  document.querySelector('.isbn').value = '';
}

//Add Alert
static showAlert(text, classList) {
let div = document.querySelector('.alert');
div.innerHTML = text;
div.classList.remove('d-none');
div.classList.add(`alert-${classList}`);
window.setTimeout(() => {
div.classList.add('d-none');
div.classList.remove(`alert-${classList}`);
}, 1000);
}

//Remove Book
static deleteBook(element) {
if(element.classList.contains('del')) {
element.parentElement.parentElement.remove();
Display.showAlert('Book has been removed', 'danger');
}
}

}


//Adding Event to Submit Button
document.querySelector('.submit').addEventListener('click', (e) => {

  e.preventDefault();
  //Inputs
  let title = document.querySelector('.title').value;
  let author = document.querySelector('.author').value;
  let isbn = document.querySelector('.isbn').value;

  let book = new Book(title, author, isbn);

  if(book.title === '' || book.author === '' || book.isbn === '') {
  Display.showAlert('Please fill all the fields!', 'danger');
  } else {

  //Adding a new book
  Display.addBook(book);

  //Adding Alert
  Display.showAlert('Book has been added!', 'success');

  //Clear Fields
  Display.clearFields(book);
  }

  //Adding Event Listener to Del button
  document.querySelector('tbody').addEventListener('click', (e) => {
  Display.deleteBook(e.target);
  });

});
