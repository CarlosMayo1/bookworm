import express, { Router } from 'express';
import * as libraryServices from '../services/libraryServices';
import * as validations from '../utils/validation';

const router: Router = express.Router();

router.get('/book', async (req, res) => {
  const limit = req.query._limit ? parseInt(req.query._limit as string, 10) : 10;

  try {
    const books = await libraryServices.getBooks(limit);
    return res.status(200).send({
      status: true,
      data: books,
      message: 'Resources were fetched successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when fetching resources',
    });
  }
});

router.get('/author', async (req, res) => {
  const limit = req.query._limit ? parseInt(req.query._limit as string, 10) : 10;

  try {
    const authors = await libraryServices.getAuthors(limit);
    return res.status(200).send({
      status: true,
      data: authors,
      message: 'Resources were fetched successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when fetching resources',
    });
  }
});

router.get('/genre', async (req, res) => {
  const limit = req.query._limit ? parseInt(req.query._limit as string, 10) : 10;
  try {
    const genre = await libraryServices.getGenres(limit);
    return res.status(200).send({
      status: true,
      data: genre,
      message: 'Resources were fetched successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when fetching resources',
    });
  }
});

router.post('/genre', async (req, res) => {
  const { name } = req.body;
  if (!validations.validateString(name)) {
    return res.status(400).json({
      status: false,
      message: 'The name of the genre is mandatory',
    });
  }

  try {
    const newGenre = await libraryServices.postGenre(name);

    return res.status(201).json({
      status: true,
      data: newGenre,
      message: 'The genre was created successfully',
    });
  } catch (e: any) {
    if (e.code === '23505') {
      // postgresql error for duplicated data
      return res.status(409).json({
        // 409 Conflict
        status: false,
        message: 'This genre already exists',
      });
    }

    // if another error occur in the database we'll send a 500 error
    return res.status(500).json({
      status: false,
      message: 'Error when creating the genre',
    });
  }
});

router.post('/author', async (req, res) => {
  const { name } = req.body;
  if (!validations.validateString(name)) {
    return res.status(400).json({
      status: false,
      message: 'The name of the author is mandatory',
    });
  }

  try {
    const author = await libraryServices.postAuthor(name);

    return res.status(201).send({
      status: true,
      data: author,
      message: 'The author was created successfully',
    });
  } catch (e: any) {
    if (e.code === '23505') {
      return res.status(409).json({
        status: false,
        message: 'The author already exists',
      });
    }

    return res.status(500).json({
      status: false,
      message: 'Error when creating the resource',
    });
  }
});

router.post('/book-genre', async (req, res) => {
  const { book_id, genre_id } = req.body;

  if (
    !validations.validateString(book_id) ||
    !validations.validateNumber(genre_id)
  ) {
    return res.status(400).json({
      status: false,
      message: 'Invalid id of the book or id of the genre',
    });
  }

  try {
    const response = await libraryServices.postBookGenre(book_id, genre_id);

    return res.status(201).send({
      status: true,
      data: response,
      message: 'The resource was created successfully',
    });
  } catch (e: any) {
    if (e.code === '23505') {
      return res.status(409).json({
        status: false,
        message: 'The resource already exists',
      });
    }

    return res.status(500).json({
      status: false,
      message: 'Error when creating the resource',
    });
  }
});

router.post('/book-author', async (req, res) => {
  const { book_id, author_id } = req.body;

  if (
    !validations.validateString(book_id) ||
    !validations.validateNumber(author_id)
  ) {
    return res.status(400).json({
      status: false,
      message: 'Invalid id of the book or id of the author',
    });
  }

  try {
    const response = await libraryServices.postBookAuthor(book_id, author_id);
    return res.status(200).send({
      status: true,
      data: response,
      message: 'The resource was created successfully',
    });
  } catch (e: any) {
    if (e.code === '23505') {
      return res.status(409).json({
        status: false,
        message: 'The resource already exists',
      });
    }
    return res.status(500).json({
      status: false,
      message: 'Error when creating the resource',
    });
  }
});

router.post('/book', async (req, res) => {
  const { book_title, book_isbn, genre_id, author_id } = req.body;

  if (
    !validations.validateString(book_title) ||
    !validations.validateString(book_isbn)
  ) {
    return res.status(400).json({
      status: false,
      message: 'Invalid book title or book isbn',
    });
  }

  if (
    !validations.validateNumber(genre_id) ||
    !validations.validateNumber(author_id)
  ) {
    return res.status(400).json({
      status: false,
      message: 'Invalid id of the genre or id of the author',
    });
  }

  // clean the isbn
  const cleanISBN = validations.cleanISBNFormat(book_isbn);

  try {
    const book = await libraryServices.postBook(
      book_title,
      cleanISBN,
      genre_id,
      author_id,
    );
    return res.status(201).send({
      status: true,
      data: book,
      message: 'The resource was created successfully',
    });
  } catch (e: any) {
    if (e.code === '23505') {
      return res.status(409).json({
        status: false,
        message: 'The resource already exists',
      });
    }

    return res.status(500).json({
      status: false,
      message: 'Error when creating the resource: ' + e,
    });
  }
});

router.delete('/book/:id', async (req, res) => {
  const { id } = req.params;

  if (!validations.validateString(id) || !id) {
    return res.status(400).json({
      status: false,
      message: 'The id of the book mandatory',
    });
  }

  try {
    const response = await libraryServices.deleteBook(id);
    return res.status(200).send({
      status: true,
      data: response,
      message: 'The resource was deleted successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when deleting the resource',
    });
  }
});

router.put('/book', async (req, res) => {
  const { book_id, book_title, book_isbn, book_genre_id, book_author_id } =
    req.body;

  if (
    !validations.validateString(book_title) ||
    !validations.validateString(book_isbn)
  ) {
    return res.status(400).json({
      status: false,
      message: 'Invalid book title or book isbn',
    });
  }

  if (
    !validations.validateNumber(book_genre_id) ||
    !validations.validateNumber(book_author_id)
  ) {
    return res.status(400).json({
      status: false,
      message: 'Invalid id of the genre or id of the author',
    });
  }

  try {
    const response = await libraryServices.putBook(
      book_id,
      book_title,
      book_isbn,
      book_genre_id,
      book_author_id,
    );
    return res.status(200).send({
      status: true,
      data: response,
      message: 'The book was updated successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when updating the resource',
    });
  }
});

router.put('/genre', async (req, res) => {
  const { id, name } = req.body;

  if (!validations.validateNumber(id) || !validations.validateString(name)) {
    return res.status(400).json({
      status: false,
      message: 'The id of the genre and the name are mandatory',
    });
  }

  try {
    const response = await libraryServices.putGenre(id, name);
    return res.status(200).send({
      status: true,
      data: response,
      message: 'The genre was updated successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when updating the resource',
    });
  }
});

router.delete('/genre/:id', async (req, res) => {
  const { id } = req.params;

  if (!validations.validateString(id)) {
    return res.status(400).json({
      status: false,
      message: 'The id of the genre is mandatory',
    });
  }

  try {
    await libraryServices.deleteGenre(id);
    return res.status(200).send({
      status: true,
      message: 'Resource deleted successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when deleting the genre',
    });
  }
});

router.put('/author', async (req, res) => {
  const { id, name } = req.body;

  if (!validations.validateNumber(id) || !validations.validateString(name)) {
    return res.status(400).json({
      status: false,
      message: 'The id of the author and the name are mandatory',
    });
  }

  try {
    const response = await libraryServices.putAuthor(id, name);
    return res.status(200).send({
      status: true,
      data: response,
      message: 'The author was updated successfully',
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: 'Error when updating the author',
    });
  }
});

router.delete('/author/:id', async (req, res) => {
  const { id } = req.params;

  if (!validations.validateString(id)) {
    return res.status(400).json({
      status: false,
      message: 'The id of the author is mandatory',
    });
  }

  try {
    await libraryServices.deleteAuthor(id);
    return res.status(200).send({
      status: true,
      message: 'The author was deleted successfully',
    });
  } catch (e: any) {
    return res.send(500).json({
      status: false,
      message: 'Error when deleting the author',
    });
  }
});

export default router;
