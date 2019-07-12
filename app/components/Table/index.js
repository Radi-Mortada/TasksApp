import React from 'react';
import PropTypes from 'prop-types';
import ImmutableProptypes from 'react-immutable-proptypes';
import { RowGrid, ColumnGrid } from 'components/Grid';

const Table = props => {
  const { data, onEditClick, onDeleteClick } = props;

  // We add one more column for actions.
  const numOfColumns = data.first().size + 1;

  const header = (
    <RowGrid isHeader columnsCount={numOfColumns} key="header">
      {data
        .first()
        .keySeq()
        .map(key => (
          <ColumnGrid key={key}>{key}</ColumnGrid>
        ))}
    </RowGrid>
  );

  const table = data.reduce(
    (acc, cur) => {
      const row = (
        <RowGrid key={cur.get('id')} columnsCount={numOfColumns}>
          {cur.entrySeq().map(([key, value]) => {
            if (typeof value === 'object') {
              return (
                <ColumnGrid key={key}>
                  {value
                    .entrySeq()
                    // eslint-disable-next-line no-unused-vars
                    .map(([childKey, childValue]) => `${childValue} `)}
                </ColumnGrid>
              );
            }
            return <ColumnGrid key={key}>{value}</ColumnGrid>;
          })}
          <ColumnGrid>
            <button onClick={onEditClick(cur.get('id'))} type="button">
              Edit
            </button>
            <button onClick={onDeleteClick(cur.get('id'))} type="button">
              Delete
            </button>
          </ColumnGrid>
        </RowGrid>
      );

      acc.push(row);

      return acc;
    },
    [header],
  );

  return table;
};

Table.propTypes = {
  data: ImmutableProptypes.list.isRequired,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
};

export default Table;
