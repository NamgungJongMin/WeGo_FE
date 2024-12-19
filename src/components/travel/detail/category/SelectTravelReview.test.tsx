import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import SelectTravelReview from './SelectTravelReview';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('SelectTravelReview', () => {
  const queryClient = new QueryClient();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: 'test-id' });
  });

  it('모임리뷰가 렌더링된다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SelectTravelReview />
      </QueryClientProvider>,
    );

    await waitFor(() =>
      expect(screen.getByText('여행지기')).toBeInTheDocument(),
    );

    expect(
      await screen.findByText(
        '정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다.',
      ),
    ).toBeInTheDocument();
    expect(await screen.findByText('4.2')).toBeInTheDocument();
    expect(await screen.findByText('3')).toBeInTheDocument();
    const elements = await screen.findAllByText('5');
    expect(elements).toHaveLength(2);

    // 이미지 테스트
    const imageElement =
      await screen.findByAltText('여행지기의 여행리뷰 이미지');
    expect(imageElement).toBeInTheDocument();
  });
});
