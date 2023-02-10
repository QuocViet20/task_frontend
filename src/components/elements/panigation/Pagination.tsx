
import { memo, useMemo } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//types
import { PanigationProps } from '../../../types';
import { getPaginationItems } from '../../../utils/paginationArray';

const PaginationComponent = memo((
  {
    currentPage,
    totalPages,
    maxLength,
    onPageChange
  }: PanigationProps) => {
    const pageNums = getPaginationItems(currentPage,totalPages, maxLength)

    const onFirstClick = () => {
      onPageChange(1)
      
    }

    const onPrevClick = () => {
      onPageChange(currentPage-1)
    }

    const onNextClick = () => {
      onPageChange(currentPage+1)
    }

    const onLastClick = () => {
      onPageChange(totalPages)
    }

  return (
    <Pagination className="mt-4">
        <Pagination.First disabled={currentPage ===1} onClick={onFirstClick}/>
        <Pagination.Prev disabled={currentPage===1} onClick={onPrevClick} />
        {pageNums.map((pageNumber) => {
          return (
            <Link
              to={`/tasks?page=${pageNumber}`}
              className="text-decoration-none"
            >
              <Pagination.Item
                active={currentPage === pageNumber}
                onClick={() => {
                  onPageChange(pageNumber)
                }}
              >
                {!isNaN(pageNumber) ? pageNumber : "..."}
              </Pagination.Item>
            </Link>
          );
        })}
      <Pagination.Next disabled={currentPage === totalPages} onClick={onNextClick}/>
      <Pagination.Last disabled={currentPage === totalPages} onClick={onLastClick}/>
    </Pagination>
  )

})

export default PaginationComponent
