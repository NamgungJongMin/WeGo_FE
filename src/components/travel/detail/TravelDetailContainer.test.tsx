import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { getTravelDetail } from '@/api/travelApi';
import TravelDetail from './TravelDetail';

describe('TravelDetail', () => {
  const id = '1';
  const queryClient = new QueryClient();

  // 공통 렌더링 함수
  const renderTravelDetail = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['travels', { id }],
      queryFn: () => getTravelDetail({ id }),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="로딩중">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TravelDetail id={id} />
          </HydrationBoundary>
        </Suspense>
      </QueryClientProvider>,
    );
  };

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('여행 상세 데이터를 불러와 여행 정보가 표시된다', async () => {
    await renderTravelDetail();

    // 여행 상세 정보가 잘 표시되는지 확인
    expect(
      await screen.findByText('12월에 떠나는 겨울여행'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('2024.12.03 - 2024.12.06'),
    ).toBeInTheDocument();
    expect(await screen.findByText('10명')).toBeInTheDocument();
    expect(await screen.findByText('2024.11.31')).toBeInTheDocument();
    expect(await screen.findByText('마감된 여행입니다.')).toBeInTheDocument();
  });

  it('여행 상세 정보를 SelectTravelDetail 컴포넌트에서 렌더링한다', async () => {
    await renderTravelDetail();

    // SelectTravelDetail에서 렌더링되는 데이터 확인
    expect(await screen.findByText('녹차라떼 아이스')).toBeInTheDocument();
    expect(await screen.findByText('# 겨울여행')).toBeInTheDocument();
  });

  it('여행 일정(SelectTravelItinerary) 버튼 클릭 시 렌더링된다', async () => {
    await renderTravelDetail();

    // '여행일정' 버튼 클릭 후 'SelectTravelItinerary' 컴포넌트 렌더링 확인
    fireEvent.click(screen.getByText('여행일정'));
    expect(await screen.findByText('Day 1')).toBeInTheDocument();
    const details = await screen.findAllByText('상세 일정 확인');
    expect(details).toHaveLength(3);
  });

  it('모임리뷰 (SelectTravelReview) 버튼 클릭 시 렌더링된다', async () => {
    await renderTravelDetail();
    fireEvent.click(screen.getByText('모임리뷰'));

    await waitFor(() =>
      expect(screen.getByText('여행지기')).toBeInTheDocument(),
    );
    // expect(await screen.findByText('여행지기')).toBeInTheDocument();
    expect(
      await screen.findByText(
        '정선의 겨울은 너무 아름다웠어요! 특히 눈 내린 풍경이 인상 깊었습니다.',
      ),
    ).toBeInTheDocument();
    expect(await screen.findByText('3')).toBeInTheDocument();
    const elements = await screen.findAllByText('5');
    expect(elements).toHaveLength(2);

    // 이미지 테스트
    const imageElement =
      await screen.findByAltText('여행지기의 여행리뷰 이미지');
    expect(imageElement).toBeInTheDocument();
  });
});
