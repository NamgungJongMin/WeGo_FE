import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { server } from '@/mocks/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { fetchPopularTravel } from '@/api/travelApi';
import WeeklyPopular from './WeeklyPopular';

describe('WeeklyPopular', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('여행 데이터를 불러와 WeeklyPopularContainer 컴포넌트를 렌더링한다', async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['travels', 'popular'],
      queryFn: fetchPopularTravel,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="로딩중">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <WeeklyPopular />
          </HydrationBoundary>
        </Suspense>
      </QueryClientProvider>,
    );

    // 여행 카드 테스트
    expect(
      await screen.findByText('부여로 떠나는 다함께 시골투어'),
    ).toBeInTheDocument();
    expect(await screen.findByText('충남 부여')).toBeInTheDocument();
    expect(await screen.findByText('11/12')).toBeInTheDocument();
    const elements = await screen.findAllByText('12.24');
    expect(elements).toHaveLength(1);

    expect(
      await screen.findByText('도쿄에서 즐기는 미식여행'),
    ).toBeInTheDocument();

    // 이미지 테스트
    const imageElement = await screen.findByAltText(
      '겨울에만 즐길 수 있는 고즈넉한 한옥 스테이 - 북촌 여행 이미지',
    );
    expect(imageElement).toBeInTheDocument();
  });
});
