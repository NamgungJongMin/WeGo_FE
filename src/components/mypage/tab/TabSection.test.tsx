import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TabSection from './TabSection';

const queryClient = new QueryClient();
const renderWithQueryClient = (ui: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe('TabSection 컴포넌트', () => {
  it('MainTab과 SubTab, TabContents가 정상적으로 렌더링되어야 한다.', () => {
    renderWithQueryClient(<TabSection />);

    expect(screen.getByTestId('mainTab')).toBeInTheDocument();
    expect(screen.getByTestId('myTravelSubTab')).toBeInTheDocument();
    expect(screen.getByTestId('upcomming-travels')).toBeInTheDocument();
  });
});
