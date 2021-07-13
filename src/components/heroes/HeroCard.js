import React from 'react';
import { Link } from 'react-router-dom';
import { heroesImgs } from '../../helpers/heroesImgs';

export const HeroCard = ({
  id,
  superhero,
  alter_ego,
  first_appearance,
  characters,
}) => {
  return (
    <>
      <div
        className='card mb-3 animate__animated animate__backInUp animate__faster'
        style={{ maxWidth: 450 }}
      >
        <div className='row g-0'>
          <div className='col-md-4'>
            <img
              src={heroesImgs(`./${id}.jpg`).default}
              className='card-img-top'
              alt={superhero}
            />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>{superhero}</h5>
              <p className='card-text'>{alter_ego}</p>
              {alter_ego !== characters && (
                <p className='card-text'>{characters}</p>
              )}
              <p className='card-text'>
                <small className='text-muted'>{first_appearance}</small>
              </p>
              <Link to={`./hero/${id}`}>Mas...</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
