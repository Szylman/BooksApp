{   
  'use strict';
  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '.books-list',
      booksImg: '.book__image',
    },
    form:{
      filter: '.filters',
    },
  };
  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };
  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.initActions();
    }
    render(){
      const thisBooks = this;
      for (const book of dataSource.books){
        book.ratingWidth = book.rating * 10;
        book.backgroud = thisBooks.determineBgc(book.rating);
        const generatedHTML = templates.menuProduct(book);
        thisBooks.book = utils.createDOMFromHTML(generatedHTML);
        thisBooks.bookContainer = document.querySelector(select.containerOf.bookList);
        thisBooks.bookContainer.appendChild(thisBooks.book);
      }
    }
    initData(){
      const thisBooksList = this;  
      this.data = dataSource.books;
      /*[DONE]add empty array*/
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
      thisBooksList.filtersContainer = document.querySelector(select.form.filter);
    }
    

    initActions(){
      const thisBooksList = this;
      thisBooksList.booksImage = document.querySelectorAll(select.containerOf.booksImg);

      for (const bookImage of thisBooksList.booksImage) {
        bookImage.addEventListener('dblclick', function(event){
          event.preventDefault();
          const clickedElement = event.target.offsetParent;
          const dataId = clickedElement.getAttribute('data-id');
          console.log('id', dataId );
          if(
            !thisBooksList.favoriteBooks.includes(dataId) &&
            clickedElement.classList.contains('book__image')){
            clickedElement.classList.add('favorite');
            thisBooksList.favoriteBooks.push(dataId);
          }
          else if (
            thisBooksList.favoriteBooks.includes(dataId) &&
            clickedElement.classList.contains('book__image')
          ) {
            clickedElement.classList.remove('favorite');
            const indexOf = thisBooksList.favoriteBooks.indexOf(clickedElement);
            thisBooksList.favoriteBooks.splice(indexOf, 1);                  
          }
        });
      } 
      
      thisBooksList.filtersContainer.addEventListener('change', function(event){
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' ){
          console.log('wartość', event.target.value);
          if(event.target.checked)
            thisBooksList.filters.push(event.target.value);
          else{
            const index = thisBooksList.filters.indexOf(event.target.value);
            thisBooksList.filters.splice(index, 1);
          }
          thisBooksList.filtersBooks();
        }
        console.log('filters', thisBooksList.filters);
      });
    }
    filtersBooks(){
      const thisBooksList = this;
      for(const book of thisBooksList.dataSource.books){
        const bookElem = document.querySelector('.book__image[data-id="'+book.id+'"]');
        bookElem.classList.remove('hidden');
        for(const filter of thisBooksList.filters){
          if(!book.details[filter]){
            bookElem.classList.add('hidden');
            break;
          } 
        }
      }
    }

    determineBgc(rating){
      if(rating<6)
        return'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      else if (rating > 6 && rating <= 8)
        return 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      else if (rating > 8 && rating <= 9)
        return 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      else if (rating > 9)
        return 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
  new BooksList();
}