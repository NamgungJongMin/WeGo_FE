import { Participant } from '@/@types/travel';
import { Button } from '../../common/button/Button';

const TravelButtons = ({
  participant,
  organizer,
}: {
  participant: Participant[];
  organizer?: number;
}) => {
  const userId = 4;
  if (organizer === userId) {
    return (
      <div className="flex gap-4">
        <Button fill="white" label="여행취소" className="h-[52px]" />
        <Button label="공유" className="h-[52px]" />
      </div>
    );
  }

  const isParticipation = participant.find((part) => part.id === userId);
  if (isParticipation) {
    return <Button fill="white" label="동행취소" className="h-[52px] w-full" />;
  }

  return <Button fill="blue" label="동행" className="h-[52px] w-full" />;
};

export default TravelButtons;
