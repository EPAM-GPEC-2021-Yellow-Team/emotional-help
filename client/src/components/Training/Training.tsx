import './Training.scss';
import React from 'react';
import { Training } from '../../common/types/training';

export const TrainingComponent = ({ training }: { training: Training }) => {
  return (
    <section className="training-container">
      <h3>Training: «{training.title}»</h3>
      <ul className="training-list">
        <li className="training-item">
          <b>Start Date: </b>
          {training.startDate}
        </li>
        <li className="training-item">
          <b>Description: </b>
          {training.description}
        </li>
      </ul>
    </section>
  );
};