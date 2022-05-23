{   
  'use strict';
  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '.books-list',
      booksImg: '.book_image'
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
      const bookContainer = document.querySelector(select.containerOf.bookList);
      bookContainer.appendChild(thisBooks.book);
    }
  }
  render();
 
  let favoriteBooks = [];
  function initActions(){
  
    const booksImage = document.querySelectorAll(select.containerOf.booksImg);
    for (const bookImage of booksImage) {
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookImage.classList.add('favorite');
        const dataId = bookImage.getAttribute('data-id');
        favoriteBooks.push(dataId);
      });
    }  
  }
  initActions();
  console.log('initaction', favoriteBooks);
}