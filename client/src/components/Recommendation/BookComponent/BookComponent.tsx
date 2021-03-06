import React from 'react';
import { Book } from 'types';

export const BookComponent = ({ book }: { book?: Book }) => {
  return (
    <>
      <h3>Book</h3>
      <p><b>Title:</b> {book?.title}</p>
      <p><b>Author:</b> {book?.author}</p>
      <p><b>Genre:</b> {book?.genre}</p>
    </>
  );
};
