import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination 컴포넌트 테스트', () => {
  it('페이지 번호 버튼이 올바르게 렌더링된다', () => {
    const paginateMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={5} currentPage={1} paginate={paginateMock} />,
    );

    for (let i = 1; i <= 5; i++) {
      expect(getByText(i)).toBeInTheDocument();
    }
  });

  it('현재 페이지 버튼은 올바른 스타일을 가진다', () => {
    const paginateMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={5} currentPage={3} paginate={paginateMock} />,
    );

    const currentPageButton = getByText(3);
    expect(currentPageButton).toHaveClass('bg-primary-normal text-white');
  });

  it('페이지 버튼 클릭 시 paginate 함수가 호출된다', () => {
    const paginateMock = jest.fn();
    const { getByText } = render(
      <Pagination totalPages={5} currentPage={1} paginate={paginateMock} />,
    );

    fireEvent.click(getByText(2));
    expect(paginateMock).toHaveBeenCalledWith(2);
  });
});
