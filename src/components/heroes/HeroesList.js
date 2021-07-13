import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroesList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);
  // const heroes = getHeroesByPublisher(publisher);
  return (
    <div className="row align-items-start justify-content-around">
      {heroes.map((hero) => (
        // <li key={hero.id}>{hero.superhero}</li>
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
