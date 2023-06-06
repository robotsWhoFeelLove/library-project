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
}


let myLibrary = []

function Book (book, author, pages, read){
	this.book = book
	this.author = author
	this.pages = pages
	this.read = read	
}

function addBookToLibrary () {
    let book = Prompt("What is the name of the book?");
    let author = Prompt("Who is the author?");
    let pages = Prompt("How many pages?");
    let read = prompt ("Have you read it?");
    let newBook = new Book (book,author,pages,read);
    myLibrary.push(newBook);
}

function showBooks (){
    // document.querySelector("#show-books").classList.add("test-class");
    console.log("Ran showBooks");
    // myLibrary = myLibrary.map(function(e){
    //     return JSON.stringify(e);
    //   });
    // for(i=0;i<myLibrary.length;i++){
        document.querySelector(".display>div").innerHTML = "";
        myLibrary.forEach((book)=>{
            
        // alert(JSON.stringify(myLibrary[i]));
        console.log(book.book)
        let card = document.createElement("div");
        card.classList.add("card");
        card.textContent = 
          `${book.book}



By: ${book.author}`;
        // console.log(card.textContent);
        document.querySelector(".display>div").appendChild(card);})
    }

// const newBook = new Book("test","test",32,true);
// myLibrary.push(newBook);
// const newBook2= new Book("test2","test2",54,false);
// myLibrary.push(newBook2);

// function showBooks (){
//     document.querySelector("#show-books").classList.add("test-class");
//     console.log("Ran showBooks");
//     for(i=0;i<myLibrary.length;i++){
//         // alert(JSON.stringify(myLibrary[i]));
//         console.log(myLibrary[i])
//         let card = document.createElement(".div");
//         card.classList.add("card");
//         card.textContent = myLibrary[i];
//         document.querySelector(".display>div").appendChild(card);
//     }
// }
// showBooks()

// document.querySelector("#show-books").classList.remove("test-class")

document.querySelector("#show-books").addEventListener("click",showBooks()
)

function expandBook (){
    // let text = document.querySelector(".card").textContent
    // let selectedBook = document.createElement("div");
    // selectedBook.classList.toggle("selected-book");
    // selectedBook.textContent = text
    // document.querySelector(".card").appendChild(selectedBook);

    document.querySelector(".card").classList.toggle("selected-book")

    // document.querySelector(".selected-book").classList.toggle(".card")
}

let submitBook = document.querySelector("form button");

submitBook.addEventListener("click",getFormData);

// function addNewBook(event){
//     console.log(event);
//    let addBook = getFormData();
//    console.log(addBook);
//     let newBook = new Book (addBook.book.value,addBook.author.value,addBook.pages.value,addBook.read.value);
//     myLibrary.push(newBook);
//     console.log(newBook);
// }



