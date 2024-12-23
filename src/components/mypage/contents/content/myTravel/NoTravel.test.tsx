import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NoTravel from './NoTravel';

describe('NoTravel', () => {
  it('주어진 메시지가 렌더링된다', () => {
    const message = '아직 다녀온 여행이 없어요!';
    const { getByTestId, getByText } = render(<NoTravel message={message} />);
    expect(getByTestId('no-travel-message')).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  it('여행 만들기 제안이 렌더링된다.', () => {
    const { getByTestId } = render(<NoTravel travelSuggestion />);
    expect(getByTestId('no-travel-suggestion')).toBeInTheDocument();
  });
});
