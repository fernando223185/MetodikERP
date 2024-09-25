import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const TableRowClick = ({
  getTableProps,
  headers,
  page,
  prepareRow,
  headerClassName,
  bodyClassName,
  rowClassName,
  tableProps,
  onRowClick 
}) => {
  return (
    <div className="table-responsive scrollbar">
      <Table {...getTableProps(tableProps)}>
        <thead className={headerClassName}>
          <tr>
            {headers.map((column, index) => (
              <th
                key={index}
                {...column.getHeaderProps(
                  column.getSortByToggleProps(column.headerProps)
                )}
              >
                {column.render('Header')}
                {column.canSort ? (
                  column.isSorted ? (
                    column.isSortedDesc ? (
                      <span className="sort desc" />
                    ) : (
                      <span className="sort asc" />
                    )
                  ) : (
                    <span className="sort" />
                  )
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={bodyClassName}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                key={i}
                className={rowClassName}
                {...row.getRowProps({
                  onClick: () => onRowClick(row.original.id),
                  style: {
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: row.isHovered ? '#f0f0f0' : '', 
                  },
                  onMouseEnter: (e) => (e.currentTarget.style.backgroundColor = '#f0f0f0'),
                  onMouseLeave: (e) => (e.currentTarget.style.backgroundColor = ''),
                })}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      {...cell.getCellProps(cell.column.cellProps)}
                      onClick={cell.column.id === 'checkbox' ? (e) => e.stopPropagation() : null}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

TableRowClick.propTypes = {
  getTableProps: PropTypes.func,
  headers: PropTypes.array,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  tableProps: PropTypes.object,
  onRowClick: PropTypes.func 
};

export default TableRowClick;
