
import { memo, useMemo } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//types
import { PanigationProps } from '../../../types';
import { createArrayFromLength } from '../../../utils/array';

const PaginationComponent = memo((
  {
    currentPage,
    totalPages,
    onPageChange
  }: PanigationProps) => {
    const pages = useMemo(() => {
      return createArrayFromLength(totalPages, true)
    },[totalPages])

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
        {pages.map((pageNumber) => {
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
                {pageNumber}
              </Pagination.Item>
            </Link>
          );
        })}
      <Pagination.Next disabled={currentPage===totalPages} onClick={onNextClick}/>
      <Pagination.Last disabled={currentPage===totalPages} onClick={onLastClick}/>
    </Pagination>
  )

})

export default PaginationComponent
