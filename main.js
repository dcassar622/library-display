/* initialise library database (array), ID variables and
  define library and form divs */
let library = [];
let bookArrayId = 0; 
let bookDisplayId = 0;

let librarySection = document.getElementById('library-section');
const newBookForm = document.getElementById('visible-form');

/*creates a new book, and defines method 
for adding it to library database (array) */ 
class Book {
    constructor (title, author, year, pages, read) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.read = read;
    }

    addToLibrary() {
        this.id = bookArrayId;
        library.push(this);
        
        bookArrayId++;
    }       
}
    

setDefaultBooks();
setupForm();
renderDisplay();

//creates initial default 'placeholder' books
function setDefaultBooks() {
    let book1 = new Book('Harry Potter', 'JK Rowling', 1990, 270, 'yes');
    let book2 = new Book('Lord Of The Rings', 'JR Tolkien', 1926, 460, 'no');
    let book3 = new Book('Javascript For Dummies', 'Dom Man', 2020, 26, 'yes');
    
    book1.addToLibrary();
    book2.addToLibrary();
    book3.addToLibrary();
}

//creates form to add new books
function setupForm() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', showForm);
    
    let submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', submitForm);
}

//gets all the books in the database and displays them on screen
function renderDisplay() {

    bookDisplayId = 0;

    library.forEach((book)=> {
        
        let read;
        if (book.read === 'yes') read = 'read';
        else read='not read';

        let newBook = document.createElement('div');
        newBook.className = 'card'

        //sets id of book within the library
        newBook.id = bookDisplayId;

        let bookTitle = document.createElement('p');
        newBook.appendChild(bookTitle);
        bookTitle.append(book.title);
        bookTitle.id = 'title';

        let bookAuthor = document.createElement('p');
        newBook.appendChild(bookAuthor);
        bookAuthor.append(`by ${book.author}`);
        bookAuthor.id = 'author';

        let bookYear = document.createElement('p');
        newBook.appendChild(bookYear);
        bookYear.append(`published in ${book.year}`);
        bookYear.id = 'year';

        let bookPages = document.createElement('p');
        newBook.appendChild(bookPages);
        bookPages.append(`${book.pages} pages`);
        bookPages.id = 'pages';

        let bookRead = document.createElement('p');
        newBook.appendChild(bookRead);
        bookRead.append(read);
        bookRead.id = 'read';

        //create and setup toggle button for each book's 'read' status
        let toggleReadBtn = document.createElement('button');
        toggleReadBtn.innerHTML = `Toggle`;
        toggleReadBtn.className = 'toggle-read-btn';
        toggleReadBtn.addEventListener('click', (e) => {
            toggleReadStatus(e.target.parentNode.id);
        });
        newBook.appendChild(toggleReadBtn);

        //create and setup delete(remove) button for each book
        let delBtn = document.createElement('button');
        delBtn.innerHTML = 'Remove';
        delBtn.className = 'remove-btn';
        delBtn.addEventListener('click', (e) => {
            deleteBook(e.target.parentNode.id);
        });
        newBook.appendChild(delBtn);

        librarySection.appendChild(newBook);

        bookDisplayId++;
    });
}

//shows the form to add new book when 'add' button is clicked
function showForm() {
   newBookForm.className = 'visible';
}

//submits new book to the database and displays it
function submitForm() {
    title = document.getElementById('form-title').value;
    author = document.getElementById('form-author').value;
    year = document.getElementById('form-year').value;
    pages = document.getElementById('form-pages').value;
    read = document.getElementById('form-read').value;

    
    let book = new Book(title, author, year, pages, read);
    book.addToLibrary();
    clearDisplay(); 
    renderDisplay();
    newBookForm.className = 'invisible';
}

//clears the library display area and repopulates it with the updated database
function clearDisplay() {
    let librarySection = document.getElementById('library-section');
    librarySection.innerHTML='';
}

//deletes book from the library database
function deleteBook(bookId) {
    library.splice(bookId, 1);
    bookArrayId = 0; 
    bookDisplayId = 0;
    clearDisplay();
    renderDisplay();
}


function toggleReadStatus(bookId) {
    if (library[bookId].read === 'yes')
    {
        library[bookId].read = 'no';
    }
    else if (library[bookId].read === 'no')
    {
        library[bookId].read = 'yes';
    }
    clearDisplay();
    renderDisplay();
}