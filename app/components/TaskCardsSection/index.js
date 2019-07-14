/**
 *
 * TaskCardsSection
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TaskCard from 'components/TaskCard';
import Grid from 'components/Grid';

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  background-color: cadetblue;
`;

const Wrapper = styled.div`
  padding: 3px;
`;

function TaskCardsSection({ title, tasks }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {tasks.length > 0 ? (
        <Grid columnsCount={2}>
          {tasks.map(task => (
            <TaskCard task={task} key={task.id} />
          ))}
        </Grid>
      ) : (
        <Placeholder>Empty</Placeholder>
      )}
    </Wrapper>
  );
}

TaskCardsSection.propTypes = {
  tasks: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(TaskCardsSection);
