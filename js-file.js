const addBookElement = document.querySelector(".addBook");
const modalWindow = document.querySelector(".modal");
let library = [];

function Book(nameBook,author,title,numberOfPages,haveRead){
    this.nameBook = nameBook;
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.haveRead = haveRead;
}
Book.prototype.info = function() {
    return `${this.nameBook} ${this.author} ${this.title} ${this.numberOfPages} ${this.haveRead}`;
}
function addingBook(e){
    modalWindow.style.display = "flex";
}
function modalSubmit(){
     let inputs = document.querySelectorAll(".modal > form > label:not([type='radio'])");
    //  inputs = Array.from(inputs.forEach(input => input.value));
    //  inputs.join(" ");
}
function closeModal() {
    modalWindow.style.display = "none";
}
addBookElement.addEventListener("click",addingBook);