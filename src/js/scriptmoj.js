{   
  'use strict';
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const bookList = '.book-list';
    
  const render = function(){
    const thisBooks = this;
    for (const book of dataSource.books){
      const generatedHTML = template(book);
      thisBooks.book = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(bookList);
      bookContainer.appendChild(thisBooks.book);
    }
  };
  render();
}