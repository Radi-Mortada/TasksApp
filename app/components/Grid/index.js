import styled from 'styled-components';

const RowGrid = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(
    ${props => props.columnsCount || 1},
    minmax(0, 1fr)
  );
  border-bottom: 1px solid black;
  text-align: center;

  ${props =>
    props.isHeader &&
    `
  font-weight: bold;
  text-transform: uppercase;
  `};
`;

const ColumnGrid = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export { RowGrid, ColumnGrid };
