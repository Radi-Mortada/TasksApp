/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginFormPage from 'containers/LoginFormPage';
import ProjectPage from 'containers/ProjectPage/Loadable';
import SignupFormPage from 'containers/SignupFormPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivateRoute from 'containers/PrivateRoute';
import Page from 'components/Page';
import Header from 'components/Header';

import GlobalStyle from '../../global-styles';

const App = () => (
  <Page>
    <Header />
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginFormPage} />
      <Route exact path="/signup" component={SignupFormPage} />
      <PrivateRoute exact path="/project/:id" component={ProjectPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <GlobalStyle />
  </Page>
);

App.propTypes = {};

export default App;
