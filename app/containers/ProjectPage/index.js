/**
 *
 * ProjectPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { RESTART_ON_REMOUNT } from 'utils/constants';
import { makeSelectLocation } from 'containers/App/selectors';
import ProjectCreatorForm from 'containers/ProjectCreatorForm';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TaskCardsSection from 'components/TaskCardsSection/Loadable';
import {
  makeSelectCurrentProjectTasksInDoing,
  makeSelectCurrentProjectTasksInDone,
  makeSelectCurrentProject,
  makeSelectCurrentProjectIsAdmin,
} from './selectors';
import { loadTasksInvoked } from './actions';
import reducer from './reducer';
import saga from './saga';

const SectionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
`;

export function ProjectPage({
  location,
  loadTasks,
  tasksInDone,
  tasksInDoing,
  project,
  isAdmin,
}) {
  useInjectReducer({ key: 'projectPage', reducer });
  useInjectSaga({ key: 'projectPage', saga, mode: RESTART_ON_REMOUNT });

  useEffect(() => {
    const { pathname } = location;
    const parts = pathname.split('/');
    const projectId = parts.pop();

    loadTasks(projectId);
  }, [location]);

  return (
    <div>
      <Helmet>
        <title>ProjectPage</title>
        <meta name="description" content="Description of ProjectPage" />
      </Helmet>
      {isAdmin && project && <ProjectCreatorForm initialValues={project} />}
      <SectionsWrapper>
        {tasksInDoing && (
          <TaskCardsSection title="Doing" tasks={tasksInDoing} />
        )}
        {tasksInDone && <TaskCardsSection title="Done" tasks={tasksInDone} />}
      </SectionsWrapper>
    </div>
  );
}

ProjectPage.propTypes = {
  location: PropTypes.object.isRequired,
  tasksInDoing: PropTypes.array,
  tasksInDone: PropTypes.array,
  loadTasks: PropTypes.func.isRequired,
  project: PropTypes.object,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  tasksInDoing: makeSelectCurrentProjectTasksInDoing(),
  tasksInDone: makeSelectCurrentProjectTasksInDone(),
  location: makeSelectLocation(),
  project: makeSelectCurrentProject(),
  isAdmin: makeSelectCurrentProjectIsAdmin(),
});

const mapDispatchToProps = {
  loadTasks: loadTasksInvoked,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(ProjectPage);
