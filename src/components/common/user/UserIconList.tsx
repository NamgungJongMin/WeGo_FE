import { Participant } from '@/@types/travel';
import UserIcon from './UserIcon';

const UserIconList = ({ participant }: { participant: Participant[] }) => {
  const maxVisible = 4;
  const visibleUsers = participant.slice(0, maxVisible);
  const extraCount = participant.length - maxVisible;

  return (
    <div className="flex items-center space-x-[-12px]">
      {visibleUsers.map((user, index) => (
        <div
          key={user.id}
          className="relative flex-shrink-0"
          style={{
            zIndex: index,
          }}
        >
          <UserIcon
            size="sm"
            profileImage={user.profileImage}
            nickname={user.nickname}
          />
        </div>
      ))}

      {extraCount > 0 && (
        <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm font-semibold text-slate-500">
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default UserIconList;
