/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { useEffect, memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import ProjectCreatorForm from 'containers/ProjectCreatorForm';
import { makeSelectAllProjects } from 'containers/App/selectors';
import ProjectCards from 'components/ProjectCards';
import { useInjectSaga } from 'utils/injectSaga';

import { loadProjectsInvoked } from './actions';
import saga from './saga';

const HomePage = ({ loadProjects, projects }) => {
  useInjectSaga({ key: 'loginForm', saga });

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div>
      <ProjectCreatorForm />
      {projects && <ProjectCards projects={projects} />}
    </div>
  );
};

HomePage.propTypes = {
  loadProjects: PropTypes.func.isRequired,
  projects: PropTypes.array,
};

const mapDispatchToProps = {
  loadProjects: loadProjectsInvoked,
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectAllProjects(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
