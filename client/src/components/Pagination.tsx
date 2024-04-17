import React from 'react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const lastPage = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ textAlign: 'center' }}>
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          margin: '10px',
        }}
      >
        <li style={{ margin: '0 10px' }}>
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ cursor: currentPage > 1 ? 'pointer' : 'default' }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/${
                currentPage === 1 ? 'ico-larr-gray' : 'ico-larr'
              }.png`}
              alt="왼쪽화살표"
            />
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} style={{ margin: '0 10px' }}>
            <button
              onClick={() => paginate(number)}
              style={{
                cursor: 'pointer',
                borderRadius: '2px',
                border:
                  currentPage === number
                    ? '1px solid #FBC02D'
                    : '1px solid #EEEEEE',
                background: 'none',
                color: currentPage === number ? 'black' : '#8A8A8A',
              }}
            >
              {number}
            </button>
          </li>
        ))}
        <li style={{ margin: '0 10px' }}>
          <button
            onClick={() =>
              currentPage < pageNumbers.length && paginate(currentPage + 1)
            }
            disabled={currentPage === lastPage}
            style={{
              cursor: currentPage < pageNumbers.length ? 'pointer' : 'default',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/${
                currentPage === lastPage ? 'ico-rarr-gray' : 'ico-rarr'
              }.png`}
              alt="오른쪽화살표"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
