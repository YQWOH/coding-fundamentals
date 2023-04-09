class Library {
    // your code
 constructor(name) {
    this.name = name
    this.books = []
 }
 addBook(book){
    this.books.push(book)
 }
 getBooks(booklist){
    const selectAllBooks = booklist === undefined ? true : false 
    const allbooks = this.books.map(book => {
        return book.name
    })
    if (selectAllBooks) { return allbooks} 
    else { 
        const selectBook = this.books.filter(book => booklist.includes(book.name))
        const selectBookName = selectBook.map(selectb => {
            return selectb.name
        })
        return selectBookName
    }
 }
 getBooksByCategory(categoryList) {
    const selectAllCategory = categoryList === undefined ? true : false 
    const allCategoryBooks = this.books.map(book => {
        return book.name
    })
    if (selectAllCategory) {
        return allCategoryBooks
    } else {
        const categoryBooksList = this.books.filter(categoryBook => categoryList.includes(categoryBook.category))
        const categoryBooksName = categoryBooksList.map(book => {
            return book.name
        })
        return categoryBooksName
    }
 }
}
  
class Book {
// your code
  constructor(name, author, category) {
      this.name = name,
      this.author = author,
      this.category = category
  }
}

const library = new Library('ABC')

const bookA = new Book('Book A', 'Mr. A', 'Sci-Fi')
const bookB = new Book('Book B', 'Mr. A', 'Sci-Fi')
const bookC = new Book('Book C', 'Mr. B', 'Horror')
library.addBook(bookA)
library.addBook(bookB)
library.addBook(bookC)

const allBooks = library.getBooks()
const horrorBooks = library.getBooksByCategory('Horror')

console.log(allBooks) // ['Book A', 'Book B', 'Book C']
console.log(horrorBooks) // ['Book C']