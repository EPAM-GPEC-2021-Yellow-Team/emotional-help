import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './TestCard.scss';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { testsPutRequest, testsDeleteRequest } from '../../../store/actions';

export const TestCard = (props) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState(props.test.title);
  const [id, setId] = useState(props.test.id);
  const [type, setType] = useState(props.test.typeOfTest);

  const dispatch = useDispatch();

  const body = {
    id: Number.parseInt(id),
    title: title,
    typeOfTest: Number.parseInt(type),
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    console.log(showForm);
  };

  const handleSubmitTest = () => {
    handleShowForm();
    console.log('SUBMIT');
    dispatch(testsPutRequest(body));
  };

  const handleViewQuestions = () => {
    navigate(`/admin/questions/${id}`);
  };
  const handleDelete = () => {
    dispatch(testsDeleteRequest(body));
  };

  return (
    <Card sx={{ width: 250, margin: 1, minHeight: 135 }}>
      {showForm ? (
        <>
          <TextField
            id="outlined-basic"
            label="Title"
            value={title}
            onChange={handleChangeName}
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
          <TextField
            id="outlined-basic"
            label="Type of test"
            value={type}
            onChange={handleChangeType}
            size="small"
            variant="outlined"
            margin="dense"
          />

          <button onClick={handleSubmitTest}>Submit</button>
        </>
      ) : (
        <>
          {' '}
          <CardContent>
            <div className="card-info">
              <Typography variant="body2">Title: {title}</Typography>
              <Typography variant="body2">ID: {id}</Typography>
              <Typography variant="body2">Type of test: {type}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <button onClick={handleViewQuestions}>View questions</button>
            <button onClick={handleShowForm}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

TestCard.propTypes = {
  test: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    typeOfTest: PropTypes.number,
  }),
};
