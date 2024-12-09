import Arrow from '@/assets/down.svg';

interface Props {
  title: string;
  subTitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const ScheduleAccordionItem = ({
  title,
  subTitle,
  isOpen,
  onToggle,
  children,
}: Props) => {
  return (
    <section className="w-[335px]" aria-labelledby={`accordion-title-${title}`}>
      <header
        className="flex cursor-pointer items-center gap-1.5 rounded-t bg-gray-600 px-5 py-2.5"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
        id={`accordion-title-${title}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <h2 className="title-4-b text-primary-white">{title}</h2>
        <p className="body-2-r flex-1 text-label-assistive">{subTitle}</p>
        <div
          className={`ml-2 flex h-5 w-5 items-center transition ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <Arrow />
        </div>
      </header>
      <div
        id={`accordion-content-${title}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? '[grid-template-rows:_1fr]' : '[grid-template-rows:_0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-x border-b border-line-alternative bg-white p-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleAccordionItem;
