/**
 *
 * ProjectCard
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
  border: 1px papayawhip solid;
  border-radius: 6px;
  min-width: 20rem;
  padding: 1rem;
  background-color: darkCyan;
  text-decoration: none;
`;

const Title = styled.h1`
  font-size: 1rem;
  color: white;
`;

function ProjectCard({ project }) {
  const { name, id } = project;
  return (
    <Wrapper to={`/project/${id}`}>
      <Title>{name}</Title>
    </Wrapper>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default memo(ProjectCard);
