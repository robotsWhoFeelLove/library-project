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
        myLibrary.push(formSubmit)
        showBooks(); 
        saveBooks(); 
}

function saveBooks (){
    let f = JSON.stringify(myLibrary);
    window.localStorage.setItem("myLibrary", f)
}

function retrieveBooks (){
    let f = window.localStorage.getItem("myLibrary");
    if(f) return JSON.parse(f);
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
        document.querySelector(".console").innerHTML = "";
        myLibrary.forEach((book,i)=>{
        let card = document.createElement("div");
        card.classList.add(book.card);
        card.classList.add("card");            
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



let submitBook = document.querySelector("form button");
    submitBook.addEventListener("click",getFormData);


document.querySelector(".add-book").addEventListener("click",(event)=>{
toggleHidden(form);
   })

function toggleHidden(things){
    things.forEach(thing=> thing.classList.toggle("hidden"))
}

const wrapper = document.querySelector(".console");
let bookSelected;

wrapper.addEventListener('click', (event) => {

    let thisNode = event.target;
    let thisParent = event.target.parentNode
if(thisNode.classList == "read-button"){
    markAsRead()
}
if(thisNode.classList == "selected-button"){
    removeBook()
} 
if(thisNode.classList == "console"){
        return;}
if(document.querySelector(".selected-book") !== null){
    document.querySelector(".selected-book").remove();
}; 

if(thisNode.classList == "selected-book" || thisParent.classList == "selected-book"){

    return;}

if (thisNode.id.substring(0,5) == "index"){
    bookSelected = thisNode.id
    showSelectedBook(bookSelected);
} else 
if ( thisParent.id.substring(0,5) === "index"){
    bookSelected = thisParent.id
    showSelectedBook(bookSelected);
    } 


})




function markAsRead(){
    myLibrary[bookSelected.substring(6)].read = true 
    saveBooks()     
}


  function showSelectedBook(book){
    let bookObj = myLibrary[book.substring(6)]; 
    let selectedBook = document.createElement("div");
    selectedBook.classList.add("selected-book");
    selectedBook.setAttribute("id",`selected-${book}`);

    let title = document.createElement("div");
    title.classList.add("selected-title");
    title.textContent = bookObj.book 

    let author = document.createElement("div");
    author.classList.add("selected-author");
    author.textContent = bookObj.author   

    let pages = document.createElement("div");
    pages.classList.add("selected-pages");
    pages.textContent = bookObj.pages  

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
    
    if(!bookObj.read){        
        selectedBook.appendChild(checkRead);  
     }

    document.getElementById(book).prepend(selectedBook);

  }

    function removeBook(){myLibrary.splice(bookSelected.substring(6),1)
        document.querySelector(".selected-book").remove();

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



