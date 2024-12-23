import { SubTab as SubTabType } from '@/@types/mypage';
import { MY_PAGE_TABS_NAME } from '@/constants/mypage';
import cn from '@/utils/cn';

interface Props {
  selectedSubTab: SubTabType;
  setSelectedSubTab: (subTab: SubTabType) => void;
}

const MyReviewSubTab = ({ selectedSubTab, setSelectedSubTab }: Props) => {
  return (
    <div className="relative mx-auto mb-4" data-testid="myReviewSubTab">
      <ul className="body-2-r flex w-[335px] divide-x text-label-alternative">
        {['writable', 'written'].map((subTab) => (
          <li
            key={subTab}
            className={cn({
              'pr-2': subTab === 'writable',
              'px-2': subTab === 'written',
              'body-2-sb text-label-normal': selectedSubTab === subTab,
            })}
          >
            <button
              type="button"
              disabled={selectedSubTab === subTab}
              onClick={() => setSelectedSubTab(subTab as SubTabType)}
            >
              {MY_PAGE_TABS_NAME[subTab as SubTabType]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviewSubTab;
