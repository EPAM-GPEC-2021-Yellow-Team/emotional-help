import * as React from 'react';
import Card from '@mui/material/Card';
import './BookCard.scss';
import { useState } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

export const AddBookCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');

  const body = {
    id: Number.parseInt(id),
    title: title,
    language: language,
    genre: genre,
    author: author,
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
  };
  const handleChangeGenre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(event.target.value);
  };
  const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    console.log(showForm);
  };

  const handleSubmitTest = () => {
    handleShowForm();
    console.log('SUBMIT');
    axios
      .put('https://pslp-api.azurewebsites.net/api/Music', body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(body);
        console.log(error);
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card sx={{ width: 250, margin: 1, minHeight: 135 }}>
      {showForm ? (
        <>
          <TextField
            id="outlined-basic"
            label="Title"
            value={title}
            onChange={handleChangeTitle}
            size="small"
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-basic"
            label="Author"
            value={author}
            onChange={handleChangeAuthor}
            size="small"
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-basic"
            label="Language"
            value={language}
            onChange={handleChangeLanguage}
            size="small"
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-basic"
            label="Genre"
            value={genre}
            onChange={handleChangeGenre}
            size="small"
            variant="outlined"
            margin="dense"
          />
          <TextField
            id="outlined-basic"
            label="ID"
            value={id}
            onChange={handleChangeId}
            size="small"
            variant="outlined"
            margin="dense"
          />

          <button onClick={handleSubmitTest}>Submit</button>
        </>
      ) : (
        <>
          <button className="add-button" onClick={handleShowForm}>
            <AddIcon sx={{ fontSize: 80 }} />
          </button>
        </>
      )}
    </Card>
  );
};
