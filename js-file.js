const addBookElement = document.querySelector(".addBook");
const modalWindow = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal_background");
const modalEditWindow = document.querySelector(".modal_edit");
const form = document.querySelector("form");
let currentBookText = null;


let authorTextModal = document.querySelector(".modal_edit > form > fieldset  > #author");
let bookTitleModal = document.querySelector(".modal_edit  > form > fieldset  > #bookName");
let pageCountModal = document.querySelector(".modal_edit  > form > fieldset  > #pageCount");
let radioInputsModal = document.querySelectorAll(".modal_edit  > form > fieldset > div > input[type='radio']");

let library = document.querySelector(".library");
let libraryArray = [];

class Book{
    constructor(bookParameters){
        this.author = bookParameters[0];
        this.title = bookParameters[1];
        this.numberOfPages = bookParameters[2];
        this.haveRead = bookParameters[3];

    }
    buildBookDOM() {

        let deleteBookButton = document.createElement("div");

        let bookTextWrapperContainer = document.createElement("div");
        let bookDiv = document.createElement("div");
        let titleText = document.createElement("div");
        let authorTextModal = document.createElement("div");
        let divContainingBy = document.createElement("div");
        let pageCount = document.createElement("div");
        let haveReadText = document.createElement("div");

        bookTextWrapperContainer.classList.add("bookTextWrapperContainer");
        bookDiv.classList.add("book");
        deleteBookButton.classList.add("deleteBookButton");
        titleText.classList.add("text-for-book");
        authorTextModal.classList.add("text-for-book");
        divContainingBy.classList.add("text-for-book");
        pageCount.classList.add("text-for-book");
        haveReadText.classList.add("text-for-book");

        pageCount.classList.add("editable");
        haveReadText.classList.add("editable");
        titleText.classList.add("editable");
        authorTextModal.classList.add("editable");

        deleteBookButton.addEventListener("click",deleteBook);

        deleteBookButton.innerHTML= `&times;`;
        divContainingBy.textContent = "By";
        authorTextModal.textContent = `${this.author}`;
        titleText.textContent = `${this.title}`;
        pageCount.textContent = `${this.numberOfPages} pages`;
        haveReadText.textContent = `${this.haveRead}`;


        bookDiv.append(deleteBookButton);
        bookTextWrapperContainer.append(titleText);
        bookTextWrapperContainer.append(divContainingBy);
        bookTextWrapperContainer.append(authorTextModal);
        bookTextWrapperContainer.append(pageCount);
        bookTextWrapperContainer.append(haveReadText);
        bookDiv.append(bookTextWrapperContainer);
        library.append(bookDiv);

        bookDiv.addEventListener("click",bookClicked);
    }
}
function deleteBook(e) {
    e.stopPropagation();
    let bookDivDelete = this.parentNode;
    let index = libraryArray.findIndex(element => element === bookDivDelete);
    libraryArray[index].remove();
    libraryArray = Array.from(document.querySelectorAll(".library > .book"));
}

function bookClicked(e) {
   modalEditWindow.style.display = "flex";
   modalBackground.style.display = "block";

   currentBookText = this.lastChild.children;

    let haveRead = document.querySelector(".modal_edit  > form > fieldset > div  > label[for='haveRead']");
    let haveNotRead = document.querySelector(".modal_edit  > form > fieldset > div  > label[for='haveNotRead']");
   


   authorTextModal.value = currentBookText[2].textContent;
   bookTitleModal.value = currentBookText[0].textContent;
   pageCountModal.value= currentBookText[3].textContent.split(" ")[0];

   if(currentBookText[4].textContent ===  haveRead.textContent){
        radioInputsModal[0].checked = true;
   }
   else {
       radioInputsModal[1].checked = true;
   }


   
}

function addingBook(e){
    modalWindow.style.display = "flex";
    modalBackground.style.display = "block";
}
function modalSubmit(){
    let inputs = document.querySelectorAll(".modal > form > fieldset > input:not([type='radio'],[type='submit'])");
    let radioInput = document.querySelectorAll(".modal > form > fieldset > div > input[type='radio']");
    let bookParameters = [];
    inputs.forEach(input => bookParameters.push(input.value));
    let radioInputValue = Array.from(radioInput).filter(input => input.checked);
    bookParameters.push(radioInputValue[0].labels[0].textContent);
    let book = new Book(bookParameters);
    book.buildBookDOM();
    libraryArray = Array.from(document.querySelectorAll(".library > .book"));
    form.reset();
}
function modalEditSubmit() {


    currentBookText[0].textContent = bookTitleModal.value;
    currentBookText[2].textContent = authorTextModal.value;
    currentBookText[3].textContent = `${pageCountModal.value} pages`;

    if(radioInputsModal[0].checked){
        currentBookText[4].textContent = "Have Read";
    }
    else {
        currentBookText[4].textContent = "Haven't Read";
    }

    closeModalEdit();
}

function closeModal() {
    modalWindow.style.display = "none";
    modalBackground.style.display = "none";
    form.reset();
}
function closeModalEdit(){
    modalEditWindow.style.display = "none";
    modalBackground.style.display = "none";
}
modalBackground.addEventListener("click", () => {
    closeModal();
    closeModalEdit();
})
addBookElement.addEventListener("click",addingBook);