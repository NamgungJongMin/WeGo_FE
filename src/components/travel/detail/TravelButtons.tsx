'use client';

import { Participant } from '@/@types/travel';
import { useState } from 'react';
import {
  useTravelParticipation,
  useTravelParticipationCancle,
} from '@/queries/travel/useTravelParticipation';
import useModal from '@/hooks/useModal';
import useDeleteTravel from '@/queries/travel/useDeleteTravel';
import { useRouter } from 'next/navigation';
import { Button } from '../../common/button/Button';

const TravelButtons = ({
  travelId,
  participant,
  organizer,
}: {
  travelId: number;
  participant: Participant[];
  organizer?: number;
}) => {
  const userId = 101;
  const router = useRouter();
  const isParticipation = Boolean(
    participant.find((part) => part.id === userId),
  );
  const [isParticipate, setIsParticipate] = useState<boolean>(isParticipation);
  const { showModal, closeModal } = useModal();
  const { mutate: handleParticipation } = useTravelParticipation();
  const { mutate: handleParticipationCancle } = useTravelParticipationCancle();
  const { mutate: handleDeleteTravel } = useDeleteTravel();

  const handleParticipationClick = () => {
    handleParticipation(travelId, {
      onSuccess: () => {
        setIsParticipate(true);
      },
    });

    showModal('여행 동행 완료!', '새로운 여행지기들과 인사하러 갈까요?', {
      cancelText: '취소',
      confirmText: '채팅방가기',
      onConfirm: () => {
        handleParticipation(travelId, {
          onSuccess: () => {
            router.push('/chat');
          },
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const handleParticipationCancleClick = () => {
    showModal('정말 동행을 취소할까요?', '다시 참여할 수 있어요.', {
      cancelText: '취소',
      confirmText: '확인',
      onConfirm: () => {
        handleParticipationCancle(travelId, {
          onSuccess: () => setIsParticipate(false),
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const handleTravelCancle = () => {
    showModal('정말 여행을 취소할까요?', '여행 데이터가 모두 사라져요.', {
      cancelText: '취소',
      confirmText: '확인',
      onConfirm: () => {
        handleDeleteTravel(travelId, {
          onSuccess: () => router.back(),
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  if (organizer === userId) {
    return (
      <div className="flex gap-4 pt-6 md:pb-3 md:pt-10">
        <Button
          fill="white"
          label="여행취소"
          handler={handleTravelCancle}
          className="h-[52px]"
        />
        <Button label="공유" className="h-[52px]" />
      </div>
    );
  }

  return (
    <div className="pt-6 md:pb-3 md:pt-10">
      {isParticipate ? (
        <Button
          fill="white"
          label="동행취소"
          handler={handleParticipationCancleClick}
          className="h-[52px] w-full"
        />
      ) : (
        <Button
          fill="blue"
          label="동행"
          handler={handleParticipationClick}
          className="h-[52px] w-full"
        />
      )}
    </div>
  );
};

export default TravelButtons;
