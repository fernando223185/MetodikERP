/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { Button } from "react-bootstrap";
import Flex from "../Flex";

export const AdvanceTablePagination = ({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageCount,
  pageIndex,
  gotoPage,
}) => {
  const maxButtonsToShow = 10;
  const sideButtons = 2;

  const getPageNumbers = () => {
    const pageButtons = [];
    if (pageIndex < maxButtonsToShow - sideButtons) {
      for (let i = 0; i < maxButtonsToShow && i < pageCount; i++) {
        pageButtons.push(i);
      }
      if (pageCount > maxButtonsToShow) {
        pageButtons.push("...");
        pageButtons.push(pageCount - 1);
      }
    } else if (pageIndex >= pageCount - maxButtonsToShow + sideButtons) {
      pageButtons.push(0);
      pageButtons.push("...");
      for (let i = pageCount - maxButtonsToShow; i < pageCount; i++) {
        pageButtons.push(i);
      }
    } else {
      pageButtons.push(0);
      pageButtons.push("...");
      for (let i = pageIndex - sideButtons; i <= pageIndex + sideButtons; i++) {
        pageButtons.push(i);
      }
      pageButtons.push("...");
      pageButtons.push(pageCount - 1);
    }
    return pageButtons;
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className="flex-wrap"
      style={{ gap: "0.5rem" }} // Añade espacio entre los botones
    >
      <Button
        size="sm"
        variant="falcon-default"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        style={{ minWidth: "2.5rem" }} // Tamaño mínimo para botones
      >
        <FontAwesomeIcon icon="chevron-left" />
      </Button>
      <ul className="pagination mb-0 mx-2" style={{ gap: "0.5rem" }}>
        {" "}
        {/* Controla la separación */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <li key={`ellipsis-${index}`} className="pagination-ellipsis">
              <span className="mx-2">...</span>
            </li>
          ) : (
            <li
              key={page}
              className={classNames("page-item", {
                active: pageIndex === page,
              })}
            >
              <Button
                size="sm"
                variant="falcon-default"
                className="page"
                onClick={() => gotoPage(page)}
                style={{ minWidth: "2.5rem" }}
              >
                {page + 1}
              </Button>
            </li>
          )
        )}
      </ul>
      <Button
        size="sm"
        variant="falcon-default"
        onClick={() => nextPage()}
        disabled={!canNextPage}
        style={{ minWidth: "2.5rem" }}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </Button>
    </Flex>
  );
};

export default AdvanceTablePagination;
