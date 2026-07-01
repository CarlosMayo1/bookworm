export interface book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
}

export interface author {
  id: number;
  name: string;
}

export interface genre {
  id: number;
  name: string;
}

export interface apiResponse {
  status: boolean;
  data?: T[];
  message: string;
}

export interface bookGenre {
  book_id: string;
  genre_id: number;
}

export interface bookAuthor {
  book_id: string;
  author_id: number;
}
