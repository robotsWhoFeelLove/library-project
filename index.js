let updaters = [document.querySelector(".sidebar-button"),document.querySelector(".sidebar-check")]
let form = Array.from(document.querySelectorAll("form>*"));

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
        read.checked)
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
    this.card = `card-${Math.floor(Math.random()*3)+1}`
}

function showBooks (){
    console.log("Ran showBooks");
        document.querySelector(".console").innerHTML = "";
        myLibrary.forEach((book,i)=>{
        console.log(book.book+ ` interval: ${i}`)
        let card = document.createElement("div");
        card.classList.add(book.card);
        card.classList.add("card");             //`card-${Math.floor(Math.random()*3)+1}`);
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
    
       document.querySelector(".console").appendChild(card);})
       
    }
showBooks();

// document.querySelector("#show-books").addEventListener("click",showBooks()
// )
function expandBook (){
    document.querySelector(".card").classList.toggle("selected-book")
}

let submitBook = document.querySelector("form button");
    submitBook.addEventListener("click",getFormData);

let readCheck = document.querySelector("#update-read");

//Read Check?
// readCheck.addEventListener("click",function(){console.log("checkbox clicked")
//     myLibrary[bookSelected.substring(6)].read = readCheck.checked;
//     saveBooks();
// })

document.querySelector(".add-book").addEventListener("click",(event)=>{
toggleHidden(form);
    console.log(event.target);})

function toggleHidden(things){
    things.forEach(thing=> thing.classList.toggle("hidden"))
}

const wrapper = document.querySelector(".console");
let bookSelected;

wrapper.addEventListener('click', (event) => {
    // console.log(event.currentTarget);
    console.log(event.target);
    console.log(`parentNode is ${event.target.parentNode.classList}`)
    let thisNode = event.target;
    let thisParent = event.target.parentNode
if(thisNode.classList == "read-button"){console.log("readButton pushed")
    markAsRead()
}
if(thisNode.classList == "selected-button"){
    removeBook()
} 
if(thisNode.classList == "console"){
        return;}
if(document.querySelector(".selected-book") !== null){console.log(document.querySelector(".selected-book"));
    document.querySelector(".selected-book").remove();
}; 

if(thisNode.classList == "selected-book" || thisParent.classList == "selected-book"){
    // hideThings(updaters);
    return;}
// if (event.target.classList.contains("selected-book")){
//     document.querySelector(".selected-book").remove();
//     document.querySelector(".sidebar-button").classList.toggle("hidden"); 
// }   else
if (thisNode.id.substring(0,5) == "index"){
    bookSelected = thisNode.id
    showSelectedBook(bookSelected);
    console.log(bookSelected)
} else 
if ( thisParent.id.substring(0,5) === "index"){
    bookSelected = thisParent.id
    showSelectedBook(bookSelected);
    console.log(bookSelected)
    } 

//   console.log(event.target.id)
})



// btnRemove.addEventListener("click",removeBook())
function markAsRead(){console.log("markAsRead "+ myLibrary[bookSelected.substring(6)])
    myLibrary[bookSelected.substring(6)].read = true 
    saveBooks()      //myLibrary[bookSelected.substring(6)]
}


  function showSelectedBook(book){
    let bookObj = myLibrary[book.substring(6)]; console.log("Book obj is "+bookObj.book);
    let selectedBook = document.createElement("div");
    selectedBook.classList.add("selected-book");
    selectedBook.setAttribute("id",`selected-${book}`);
    // selectedBook.textContent = document.getElementById(book).textContent;
    // console.log(`bookSelected is ${bookSelected.substring(6)} and book is ${book}`);
    let title = document.createElement("div");
    title.classList.add("selected-title");
    title.textContent = bookObj.book //myLibrary[bookSelected.substring(6)].book;

    let author = document.createElement("div");
    author.classList.add("selected-author");
    author.textContent = bookObj.author   //myLibrary[bookSelected.substring(6)].author;

    let pages = document.createElement("div");
    pages.classList.add("selected-pages");
    pages.textContent = bookObj.pages  //myLibrary[bookSelected.substring(6)].pages;

    // console.log("isRead?" + myLibrary[bookSelected.substring(6)].read);
    // document.querySelector(".sidebar-check>input").checked = myLibrary[bookSelected.substring(6)].read  //myLibrary[bookSelected.substring(6)].read;

    let btnRemove = document.createElement("Button");
    btnRemove.classList.add("selected-button");
    btnRemove.textContent = "Remove this Book from Library"
 
    let checkRead = document.createElement("Button");
    checkRead.classList.add("read-button");
    checkRead.textContent = "Mark as Read";

    selectedBook.appendChild(title);
    selectedBook.appendChild(author);
    selectedBook.appendChild(pages);
    selectedBook.appendChild(btnRemove);
    
    if(!bookObj.read){        //myLibrary[bookSelected.substring(6)].read){
        selectedBook.appendChild(checkRead);  
     }

    document.getElementById(book).prepend(selectedBook);

    // document.querySelector(".selected-button").addEventListener("click",removeBook())
    // console.log(selectedBook.nextElementSibling);
    // title.textContent = selectedBook.nextElementSibling.textContent;
    // author.textContent = selectedBook.nextElementSibling.nextElementSibling.textContent;
    // document.querySelector(".sidebar-button").classList.toggle("hidden");
    // document.querySelector(".sidebar-check").classList.toggle("hidden");
    console.log("selected book is" +document.querySelector(".console .selected-book"));
    // if(document.querySelector(".console .selected-book") !== null){console.log("selected book is" +document.querySelector(".console .selected-book"))
    //     showHidden(updaters)
    // } else {
    //     hideThings(updaters)
    // }
  }

    function removeBook(){myLibrary.splice(bookSelected.substring(6),1)
        document.querySelector(".selected-book").remove();
        // document.querySelector(".sidebar-button").classList.toggle("hidden");
        showBooks();
        saveBooks();
    }


function showHidden(hiddenThings){
    hiddenThings.forEach(thing => thing.classList.remove("hidden"))
}

function hideThings(things){
    things.forEach(thing => thing.classList.add("hidden"))
}

hideThings(form)



