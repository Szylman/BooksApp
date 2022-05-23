{   
  'use strict';
  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '.books-list',
      booksImg: '.book__image'
    },
  };
  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };
    
  function render(){
    const thisBooks = this;
    for (const book of dataSource.books){
      const generatedHTML = templates.menuProduct(book);
      thisBooks.book = utils.createDOMFromHTML(generatedHTML);
      thisBooks.bookContainer = document.querySelector(select.containerOf.bookList);
      thisBooks.bookContainer.appendChild(thisBooks.book);
    }
  }
  render();
 
  let favoriteBooks = [];
  function initActions(){
    const thisBooksList = this;
    thisBooksList.booksImage = document.querySelectorAll(select.containerOf.booksImg);
    console.log('image', thisBooksList.booksImage);
    for (const bookImage of thisBooksList.booksImage) {
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        clickedElement.classList.add('favorite');
        const dataId = bookImage.getAttribute('data-id');
        favoriteBooks.push(dataId);
      });
    }  
  }
  initActions();
  console.log('initaction', favoriteBooks);
}