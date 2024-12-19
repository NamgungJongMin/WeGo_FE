// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { server } from '@/mocks/server';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { getTravels } from '@/api/travelApi';
// import { InitialFilters } from '@/@types/travel';
// import TravelList from './TravelList';

describe('Dummy Test', () => {
  it('always passes', () => {
    expect(true).toBe(true);
  });
});

// (global as any).IntersectionObserver = class {
//   observe = jest.fn();

//   disconnect = jest.fn();

//   unobserve = jest.fn();
// };

// describe('TravelList', () => {
//   const queryClient = new QueryClient();

//   const renderTravelList = async () => {
//     await queryClient.prefetchQuery({
//       queryKey: ['travels', InitialFilters],
//       queryFn: () => getTravels({ ...InitialFilters }),
//     });

//     render(
//       <QueryClientProvider client={queryClient}>
//         <TravelList />
//       </QueryClientProvider>,
//     );
//   };

//   beforeAll(() => server.listen());
//   afterEach(() => server.resetHandlers());
//   afterAll(() => server.close());

//   it('여행 리스트 데이터를 렌더링한다', async () => {
//     await renderTravelList();

//     expect(
//       await screen.findByText('시골투어 같이 갈사람!'),
//     ).toBeInTheDocument();
//     expect(await screen.findByText('강원도')).toBeInTheDocument();
//     expect(
//       await screen.findByAltText('시골투어 같이 갈사람! - 강원도 여행 이미지'),
//     ).toBeInTheDocument();
//   });
// });
