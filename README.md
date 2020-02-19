# Google Books Search

Search your favorite books using Google Books API on web applicaion with ReactJS, Node.js and MongoDB with MVC Pattern.

- [Google Books Search-Web-Application: Demo on Heroku](https://search-books-using-google-api.herokuapp.com/)

- [Applied to My Reponsive Portfolio](https://eunsoojung.github.io/Responsive-Portfolio/portfolio.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

```bash
# Install packages
npm i axios, mongoose, if-env, concurrently

# Run
npm start
```

## Preview

[![Google Books Search](https://github.com/EunsooJung/Google-Book-Search.git)](https://github.com/EunsooJung/Google-Book-Search/blob/master/client/public/images/%5BTeam%20IV%5D%20Google%20Book%20Search-Demo.gif)

## Usage

### Basic Usage

To get Employee-Directory, after downloading, you need to make sure Git Bash terminal open and looking at the correct folder. When you are within the correct location, you may type the following commands to ask her for information:

- npm start

### Guidelines:

- Proceeds as follows:

To use this applicaion, Clone the applicaion to your local git repository or directory:

- In your terminal, git clone https://github.com/EunsooJung/Google-Book-Search.git

To start:

- You have to install npm packages depend on my package.json file: "npm install"
- Open your terminal then "npm start"

### Code Snippet

- Project structure

  [![Google Books Search Project Structure](https://github.com/EunsooJung/Google-Book-Search/blob/master/client/public/images/Project-Structure.png)]

- Source Code Check point

1. folder "components": It provides react components.
   1.1 Applied React Hooks to use state and other React features without writing class.

```javascript
/**
 * Client-Side: Search Component - client/pages/Search.js
 */
state = {
        value: "",
        books: []
    };

    componentDidMount() {
        this.searchBook();
    }

    makeBook = bookData => {
        return {
            _id: bookData.id,
            title: bookData.volumeInfo.title,
            authors: bookData.volumeInfo.authors,
            description: bookData.volumeInfo.description,
            image: bookData.volumeInfo.imageLinks.thumbnail,
            link: bookData.volumeInfo.previewLink
        }
    }

    searchBook = query => {
        API.getBook(query)
            .then(res => this.setState({ books: res.data.items.map(bookData => this.makeBook(bookData)) }))
            .catch(err => console.error(err));
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchBook(this.state.search);
    };

    render() {
        return (
            <div>
                <Form
                    search={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <div className="container">
                    <h2>Results</h2>
                    <Results books={this.state.books} />
                </div>
            </div>
        )
    }
}
```

```javascript
/**
 * API Call from Client to Server
 */
import axios from 'axios';

export default {
  getBook: function(query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete('/api/books/' + id).then(result => result.data);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post('/api/books', bookData).then(result => result.data);
  },
  // Get the saved a books from the database
  savedBooks: function() {
    return axios.get('/api/books').then(result => result.data);
  }
};
```

```javascript
/**
 * Server-Side: controller
 */
const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err);
        res.status(422).json(err);
      });
  },
  findById: function(req, res) {
    db.Book.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err);
        res.status(422).json(err);
      });
  },
  create: function(req, res) {
    db.Book.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err);
        res.status(422).json(err);
      });
  },
  update: function(req, res) {
    db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err);
        res.status(422).json(err);
      });
  },
  remove: function(req, res) {
    db.Book.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err);
        res.status(422).json(err);
      });
  }
};
```

## Built With

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [MVC Patterns](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [React](https://reactjs.org/)
- [Mogoose](https://mongoosejs.com/docs/)
- [MongoDB](https://www.mongodb.com/)

## Authors

- **Michael(Eunsoo)Jung**
- **Lucas Coffee**
- **Tai Le**
- **Dexter Valencia**

* [Google Books Search-Web-Application: Demo](https://search-books-using-google-api.herokuapp.com/)
* [My Portfolio](https://eunsoojung.github.io/Responsive-Portfolio/portfolio.html)
* [Link to Google Books Search-Web-Application Github](https://github.com/EunsooJung/Google-Book-Search.git)
* [Link to LinkedIn](www.linkedin.com/in/eun-soo-jung/)

## License

This project is licensed under the MIT License
