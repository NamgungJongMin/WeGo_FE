import cn from '@/utils/cn';
import { MainTab as MainTabType, SubTab as SubTabType } from '@/@types/mypage';
import { MY_PAGE_TABS_NAME } from '@/constants/mypage';
import { setDefaultSubTab } from '@/utils/setDefaultSubTab';

import Highlight from './bar/Highlight';

interface Props {
  selectedTab: MainTabType;
  setSelectedTab: (tab: MainTabType) => void;
  setSelectedSubTab: (subTab: SubTabType) => void;
}

const MainTab = ({ selectedTab, setSelectedTab, setSelectedSubTab }: Props) => {
  return (
    <div className="relative mx-auto" data-testid="mainTab">
      <ul className="heading-1-sb flex w-[335px] gap-5 text-label-alternative">
        {['myTravel', 'myReview', 'mySelfTravel'].map((tab) => (
          <li
            key={tab}
            aria-label={`${tab} 탭`}
            className={cn({
              'heading-1-b text-label-normal': selectedTab === tab,
            })}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedTab(tab as MainTabType);
                setDefaultSubTab(tab as MainTabType, setSelectedSubTab);
              }}
            >
              {MY_PAGE_TABS_NAME[tab as MainTabType]}
            </button>
          </li>
        ))}
      </ul>

      <Highlight selectedTab={selectedTab} />
    </div>
  );
};

export default MainTab;
