/**
 *
 * TaskCard
 *
 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px papayawhip solid;
  border-radius: 6px;
  padding: 1rem;
  background-color: darkCyan;
  text-decoration: none;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
`;

const Description = styled.h1`
  font-size: 1rem;
  color: white;
`;

function TaskCard({ task }) {
  const { title, description, id } = task;
  return (
    <Wrapper to={`/task/${id}`}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default memo(TaskCard);
