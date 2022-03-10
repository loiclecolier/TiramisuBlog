import React from 'react';
import { usePagination } from '../../hooks/usePagination';
import './Pagination.css';
import { v4 as uuidv4 } from 'uuid'
import Link from 'react-scroll/modules/components/Link';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className='pagination-container'
    >
      <Link to="container-home" spy={true} smooth={true} offset={-70}>
        <li
          className={`pagination-item arrow ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={onPrevious}
        >
          &#129060;
        </li>
      </Link>
      {paginationRange.map(pageNumber => {
         
        if (pageNumber === '...') {
          return <li className="pagination-item dots" key={uuidv4()}>&#8230;</li>;
        }
		
        return (
          <Link to="container-home" spy={true} smooth={true} offset={-70}>
            <li
              className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
              onClick={() => onPageChange(pageNumber)} key={uuidv4()}
            >
              {pageNumber}
            </li>
          </Link>
        );
      })}

      <Link to="container-home" spy={true} smooth={true} offset={-70}>
        <li
          className={`pagination-item arrow ${currentPage === lastPage ? 'disabled' : ''}`}
          onClick={onNext}
        >
          &#129062;
        </li>
      </Link>
    </ul>
  );
};

export default Pagination;