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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </li>
      </Link>
      {paginationRange.map(pageNumber => {
         
        if (pageNumber === '...') {
          return <li className="pagination-item dots" key={uuidv4()}>&#8230;</li>;
        }
		
        return (
          <Link to="container-home" spy={true} smooth={true} offset={-70} key={uuidv4()}>
            <li
              className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
              onClick={() => onPageChange(pageNumber)}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </li>
      </Link>
    </ul>
  );
};

export default Pagination;