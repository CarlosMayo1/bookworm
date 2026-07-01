import { book, author, genre, bookGenre, bookAuthor } from '../../../types';
import { query } from '../utils/supabase-database';

export const getBooks = async (book_limit: number): Promise<book[]> => {
  const response = await query(
    `
      select id, book_title, book_isbn, author, genre from fetch_books($1);
    `,
    [book_limit],
  );
  return response.rows;
};

export const getAuthors = async (): Promise<author[]> => {
  const response = await query(
    'Select id, name from author order by name limit 10;',
  );
  return response.rows;
};

export const getGenres = async (): Promise<genre[]> => {
  const response = await query(
    'select id, name from genre order by name limit 10;', // <-- we can manage the limit of data
  );
  return response.rows;
};

export const postGenre = async (name: string): Promise<genre[]> => {
  const response = await query(
    'insert into genre(name) values($1) returning *;',
    [name],
  );
  return response.rows;
};

export const postAuthor = async (name: string): Promise<author[]> => {
  const response = await query(
    'insert into author(name) values($1) returning *;',
    [name],
  );
  return response.rows;
};

export const postBookGenre = async (
  book_id: string,
  genre_id: number,
): Promise<bookGenre[]> => {
  const response = await query(
    'insert into book_genre(book_id, genre_id) values($1, $2) returning *;',
    [book_id, genre_id],
  );
  return response.rows;
};

export const postBookAuthor = async (
  book_id: string,
  author_id: number,
): Promise<any> => {
  const response = await query(
    'insert into book_author(book_id, author_id) values($1, $2) returing *;',
    [book_id, author_id],
  );

  return response.rows;
};

export const postBook = async (
  book_title: string,
  book_isbn: string,
  genre_id: number,
  author_id: number,
): Promise<bookAuthor[]> => {
  const response = await query('select post_book($1, $2, $3, $4);', [
    book_title,
    book_isbn,
    genre_id,
    author_id,
  ]);
  return response.rows;
};

export const deleteBook = async (id: string) => {
  const response = await query('select delete_book($1);', [id]);
  return response.rows;
};

export const putBook = async (
  book_id: string,
  book_title: string,
  book_isbn: string,
  book_genre_id: number,
  book_author_id: number,
) => {
  const response = await query('select update_book($1, $2, $3, $4, $5);', [
    book_id,
    book_title,
    book_isbn,
    book_genre_id,
    book_author_id,
  ]);
  return response.rows;
};

export const putGenre = async (id: number, name: string): Promise<genre[]> => {
  const response = await query(
    'update genre set name = $2 where id = $1 returning *;',
    [id, name],
  );
  return response.rows;
};

export const deleteGenre = async (id: string): Promise<any> => {
  const response = await query('delete from genre where id = $1;', [id]);
  return response.rows;
};

export const putAuthor = async (
  id: number,
  name: string,
): Promise<author[]> => {
  const response = await query(
    'update author set name = $1 where id = $2 returning *;',
    [name, id],
  );
  return response.rows;
};

export const deleteAuthor = async (id: string): Promise<any> => {
  const response = await query('delete from author where id = $1;', [id]);
  return response.rows;
};
