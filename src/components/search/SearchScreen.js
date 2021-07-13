import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
  //manejando querystrings de busqueda
  const location = useLocation(); //Hook de react-router
  const { q = '' } = queryString.parse(location.search); //si es udefined lo asigno como string vacio

  const initialForm = {
    searchText: q,
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const { searchText } = formValues;

  //useMemo para no ejecutar cada vez que cambiar el state de la busqueda
  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };
  return (
    <div>
      <h1>searchScreen</h1>
      <hr />
      <div className="row">
        <div className="col-5 ">
          <h4>Search Form</h4>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              autoComplete="off"
              className="form-control"
              name="searchText"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Find your hero"
            />
            <button type="submit" className="btn mt-3 btn-primary col-12">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {q === '' && <div className="alert alert-info">Search a Hero</div>}
          {q !== '' && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">There is no Hero with {q}</div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
