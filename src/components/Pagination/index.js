import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./style.scss";

const max_length = 5;

const Paginations = (props) => {
  const { page, totalPage, changePage } = props;

  let list = [];
  let padding = parseInt(max_length / 2);
  let start = page - padding < 0 ? 0 : page - padding;
  let end = page + padding > totalPage - 1 ? totalPage : page + padding + 1;
  for (let i = start; i < end; i++) {
    list.push(
      <PaginationItem key={i} className={page === i ? "active" : ""}>
        <PaginationLink href="#pablo" onClick={() => changePage(i)}>
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <>
      <nav aria-label="pagination">
        <Pagination>
          <PaginationItem className={page === 0 ? "disabled" : ""}>
            <PaginationLink
              aria-label="Previous"
              href="#pablo"
              onClick={() => changePage(0)}
            >
              <i className="fa fa-angle-left" />
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
          {list}
          <PaginationItem className={page === totalPage - 1 ? "disabled" : ""}>
            <PaginationLink
              aria-label="Next"
              href="#pablo"
              onClick={() => changePage(totalPage - 1)}
            >
              <i className="fa fa-angle-right" />
              <span className="sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    </>
  );
};
export default Paginations;
