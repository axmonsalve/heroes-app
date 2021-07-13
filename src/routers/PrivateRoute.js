import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

/*Esta función nos retorna una ruta de manera privada, evaluando una condición
que permite entrar o redireccionar al login */

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  //guardo en LS el path actual (que está en el Router, por lo que esto se repite en cada ruta visitada)
  localStorage.setItem('lastPath', rest.location.pathname);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
