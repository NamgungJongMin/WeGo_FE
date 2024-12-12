interface Props {
  currentStep: number;
}

const REGISTER_TITLE = [
  '여행을 소개 해 주세요.',
  '어디로 떠나는 여행인가요?',
  '언제 떠나는 여행인가요?',
  '자세한 일정을 등록 해 주세요!',
];

const TripRegisterHeader = ({ currentStep }: Props) => {
  return (
    <header className="mb-8 flex flex-col gap-5">
      <ul className="flex items-center gap-3.5">
        {REGISTER_TITLE.map((title, index) => (
          <li
            key={title}
            className={`body-3-m flex h-5 w-5 items-center justify-center rounded-full ${
              currentStep === index
                ? 'bg-label-normal text-primary-white'
                : 'bg-slate-200 text-slate-400'
            }`}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <h2 className="title-4-b text-label-normal">
        {REGISTER_TITLE[currentStep]}
      </h2>
    </header>
  );
};

export default TripRegisterHeader;
