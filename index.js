function getFormVars(){
    book = document.querySelector("#book");
    author = document.querySelector("#author");
    pages = document.querySelector("#pages");
    read = document.querySelector("#read");
}

function getFormData(){
    let formSubmit = new Book(
        book.value,
        author.value,
        pages.value,
        read.value)
        console.log(formSubmit)
        myLibrary.push(formSubmit)
        showBooks();
        saveBooks();
}

function saveBooks (){
    let f = JSON.stringify(myLibrary);
    console.log("my library is" + f);
    window.localStorage.setItem("myLibrary", f)
}

function retrieveBooks (){
    let f = window.localStorage.getItem("myLibrary");
    if(f) return JSON.parse(f);
    console.log("ran Retrieve books: "+f)
}

let myLibrary = retrieveBooks()

function Book (book, author, pages, read){
	this.book = book
	this.author = author
	this.pages = pages
	this.read = read	
}

function showBooks (){
    console.log("Ran showBooks");
        document.querySelector(".display>div").innerHTML = "";
        myLibrary.forEach((book,i)=>{
        console.log(book.book+ ` interval: ${i}`)
        let card = document.createElement("div");
        card.classList.add(`card-${Math.floor(Math.random()*3)+1}`);
        card.setAttribute("id",`index-${i}`);
       
        let cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title")
        cardTitle.textContent =  `${book.book}`

        let cardAuthor = document.createElement("div");
        cardAuthor.classList.add("card-author")
        cardAuthor.textContent = `By: 

${book.author}`;
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
    
       document.querySelector(".display>div").appendChild(card);})
       
    }
showBooks();

// document.querySelector("#show-books").addEventListener("click",showBooks()
// )
function expandBook (){
    document.querySelector(".card").classList.toggle("selected-book")
}

let submitBook = document.querySelector("form button");
    submitBook.addEventListener("click",getFormData);

const wrapper = document.querySelector(".console");
let bookSelected;

wrapper.addEventListener('click', (event) => {
   if (event.target.id.substring(0,5) == "index"){
    bookSelected = event.target.id
    showSelectedBook(bookSelected);
    }

  console.log(event.target.id)})

  function showSelectedBook(book){
    let selectedBook = document.createElement("div");
    selectedBook.classList.add("selected-book");
    selectedBook.textContent = document.getElementById(book).textContent;
    document.getElementById(book).appendChild(selectedBook);
    document.querySelector(".sidebar-button").classList.toggle("hidden");
  }

  document.querySelector(".sidebar-button").addEventListener("click",
    function (){myLibrary.splice(bookSelected.substring(6),1)
        document.querySelector(".selected-book").remove();
        document.querySelector(".sidebar-button").classList.toggle("hidden");
        showBooks();
        saveBooks();
    })



