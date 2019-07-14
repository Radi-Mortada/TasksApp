import styled from 'styled-components';

const Grid = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(
    ${props => props.columnsCount || 1},
    minmax(0, 1fr)
  );
  text-align: center;

  ${props =>
    props.isHeader &&
    `
  font-weight: bold;
  text-transform: uppercase;
  `};
`;

export default Grid;
