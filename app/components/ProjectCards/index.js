/**
 *
 * ProjectCards
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ProjectCard from 'components/ProjectCard';
import Grid from 'components/Grid';

function ProjectCards({ projects }) {
  return (
    <>
      <h1>Projects</h1>
      <Grid columnsCount={2}>
        {projects.map(project => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Grid>
    </>
  );
}

ProjectCards.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default memo(ProjectCards);
