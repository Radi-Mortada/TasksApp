/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import HomePage from 'containers/HomePage/Loadable';
import LoginFormPage from 'containers/LoginFormPage';
import SignupFormPage from 'containers/SignupFormPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from 'containers/PrivateRoute';
import { useInjectReducer } from 'utils/injectReducer';
import Page from 'components/Page';
import Header from 'components/Header';
import reducer from './reducer';

import GlobalStyle from '../../global-styles';

const App = () => {
  useInjectReducer({
    key: 'app',
    reducer,
  });

  return (
    <Page>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginFormPage} />
        <Route exact path="/signup" component={SignupFormPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Page>
  );
};

App.propTypes = {};

export default compose(memo)(App);
