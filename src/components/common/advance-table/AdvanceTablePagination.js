import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import Flex from '../Flex';

export const AdvanceTablePagination = ({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageCount,
  pageIndex,
  gotoPage
}) => {

  const handleGotoPage = (page) => {
    localStorage.setItem('currentPage', page);
    var pag = localStorage.getItem('currentPage')
    gotoPage(pag);
  };
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage && !isNaN(savedPage)) {
      console.log("Entro en la pagina", savedPage)
      gotoPage(savedPage);
    }
  }, [gotoPage,pageIndex]);

  return (
    <Flex alignItems="center" justifyContent="center">
      <Button
        size="sm"
        variant="falcon-default"
        onClick={() => {
          previousPage();
          handleGotoPage(pageIndex - 1);  // Actualiza también el localStorage
        }}
        className={classNames({ disabled: !canPreviousPage })}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </Button>
      <ul className="pagination mb-0 mx-2">
        {Array.from(Array(pageCount).keys()).map((page, index) => (
          <li key={page} className={classNames({ active: pageIndex === page })}>
            <Button
              size="sm"
              variant="falcon-default"
              className={classNames('page', {
                'me-2': index + 1 !== pageCount
              })}
              onClick={() => handleGotoPage(page)}  // Llama a la función con localStorage
            >
              {page + 1}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        size="sm"
        variant="falcon-default"
        onClick={() => {
          nextPage();
          handleGotoPage(pageIndex + 1);  // Actualiza también el localStorage
        }}
        className={classNames({ disabled: !canNextPage })}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </Button>
    </Flex>
  );
};

export default AdvanceTablePagination;
