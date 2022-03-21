const addBookElement = document.querySelector(".addBook");
const modalWindow = document.querySelector(".modal");
const form = document.querySelector("form");
const divContainingBy = document.createElement("div");
divContainingBy.textContent = "By";

let library = document.querySelector(".library");
let libraryArray = [];

function Book(bookParameters) {
    this.author = bookParameters[0];
    this.title = bookParameters[1];
    this.numberOfPages = bookParameters[2];
    this.haveRead = bookParameters[3];

    this.buildBookDOM = function () {
        let bookDiv = document.createElement("div");
        let authorText = document.createElement("div");

        bookDiv.classList.add("book");

        authorText.textContent = `${this.author}`;
        bookDiv.textContent= `${this.title}`;

        bookDiv.append(divContainingBy);
        bookDiv.append(authorText);
        library.append(bookDiv);
    }
}
function addingBook(e){
    modalWindow.style.display = "flex";
}
function modalSubmit(){
    let inputs = document.querySelectorAll(".modal > form > fieldset > input:not([type='radio'],[type='submit'])");
    let radioInput = document.querySelector(".modal > form > fieldset > input[type='radio']");
    let bookParameters = [];
    inputs.forEach(input => bookParameters.push(input.value));
    bookParameters.push(radioInput.id);
    let book = new Book(bookParameters);
    book.buildBookDOM();
    libraryArray = Array.from(document.querySelectorAll(".library > .book"));
    form.reset();
}
function closeModal() {
    modalWindow.style.display = "none";
}
addBookElement.addEventListener("click",addingBook);