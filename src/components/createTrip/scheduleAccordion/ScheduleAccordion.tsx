'use client';

import { useState } from 'react';
import Add from '@/assets/add_Blue_18px.svg';
import { formatDate } from '@/utils/calendarHelper';
import { FormTravelPlan } from '@/@types/travelForm';
import useTravelSchedules from '@/hooks/useTravelSchedules';
import ScheduleAccordionItem from './ScheduleAccordionItem';
import ScheduleBlock from './ScheduleBlock';

interface Props {
  startDate: Date;
  endDate: Date;
  schedules: FormTravelPlan[];
  onChangeSchedule: (schedules: FormTravelPlan[]) => void;
}

const ScheduleAccordion = ({
  startDate,
  endDate,
  schedules,
  onChangeSchedule,
}: Props) => {
  const { addSchedule, updateSchedule, removeSchedule } = useTravelSchedules(
    startDate as Date,
    endDate as Date,
    schedules,
    onChangeSchedule,
  );

  const getDaysInRange = () => {
    const days: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const [openIndex, setOpenIndex] = useState<number>(0);
  const daysInRange = getDaysInRange();

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="flex flex-col gap-8" aria-label="여행 일정">
      {daysInRange.map((day, index) => (
        <ScheduleAccordionItem
          key={day.toISOString()}
          title={`Day ${index + 1}`}
          subTitle={formatDate(day)}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          <>
            <ul className="flex flex-col items-center">
              {schedules
                .filter((daySchedule) => daySchedule.tripDay === index + 1)
                .map((schedule) => (
                  <ScheduleBlock
                    key={schedule.tripOrderNumber}
                    id={schedule.tripOrderNumber}
                    dayIndex={schedule.tripDay}
                    destination={schedule.destination}
                    description={schedule.description}
                    destinationImage={schedule.destinationImage}
                    onUpdateSchedule={updateSchedule}
                    onRemoveSchedule={removeSchedule}
                  />
                ))}
            </ul>
            <button
              type="button"
              onClick={() => addSchedule(index + 1)}
              aria-label={`Day ${index + 1} 일정 추가`}
              className="body-2-sb flex h-[40px] w-[295px] items-center justify-center gap-1 rounded border border-blue-100 bg-blue-100 text-primary-normal transition duration-500 hover:border-primary-normal"
            >
              <Add />
              일정 추가
            </button>
          </>
        </ScheduleAccordionItem>
      ))}
    </div>
  );
};

export default ScheduleAccordion;
