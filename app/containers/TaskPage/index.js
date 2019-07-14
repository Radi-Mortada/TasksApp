/**
 *
 * TaskPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { RESTART_ON_REMOUNT } from 'utils/constants';
import { makeSelectLocation } from 'containers/App/selectors';
import TaskCreatorForm from 'containers/TaskCreatorForm';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCurrentTask, makeSelectUserCanEditTask } from './selectors';
import { loadTaskInvoked } from './actions';
import reducer from './reducer';
import saga from './saga';

export function TaskPage({ location, loadTask, task, taskIsEditable }) {
  useInjectReducer({ key: 'taskPage', reducer });
  useInjectSaga({ key: 'taskPage', saga, mode: RESTART_ON_REMOUNT });

  const { pathname } = location;
  const parts = pathname.split('/');
  const taskId = parts.pop();

  useEffect(() => {
    loadTask(taskId);
  }, [location]);

  return (
    <div>
      <Helmet>
        <title>TaskPage</title>
        <meta name="description" content="Description of TaskPage" />
      </Helmet>
      {task && (
        <TaskCreatorForm
          initialValues={task}
          fieldsDisabled={!taskIsEditable}
        />
      )}
    </div>
  );
}

TaskPage.propTypes = {
  location: PropTypes.object.isRequired,
  loadTask: PropTypes.func.isRequired,
  task: PropTypes.object,
  taskIsEditable: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  task: makeSelectCurrentTask(),
  taskIsEditable: makeSelectUserCanEditTask(),
});

const mapDispatchToProps = {
  loadTask: loadTaskInvoked,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(TaskPage);
