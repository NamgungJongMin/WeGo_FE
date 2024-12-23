interface Props {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ totalPages, currentPage, paginate }: Props) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-4 flex justify-center" data-testid="mypage-pagination">
      <ul className="body-2-sb inline-flex -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => paginate(number)}
              className={`border px-2.5 py-1 ${
                number === currentPage
                  ? 'bg-primary-normal text-white'
                  : 'bg-white text-primary-normal'
              } border-gray-300`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
