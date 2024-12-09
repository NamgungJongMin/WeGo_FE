'use client';

import { useState } from 'react';
import Add from '@/assets/add_Blue_18px.svg';
import { formatDate } from '@/utils/calendarHelper';
import { Schedule } from '@/@types/date';
import ScheduleAccordionItem from './ScheduleAccordionItem';
import ScheduleBlock from './ScheduleBlock';

interface Props {
  startDate: Date;
  endDate: Date;
  schedules: Schedule[];
  onAddSchedule: (dayIndex: number) => void;
  onUpdateSchedule: (
    id: number,
    field: string,
    value: string,
    dayIndex: number,
  ) => void;
  onRemoveSchedule: (id: number, dayIndex: number) => void;
}

const ScheduleAccordion = ({
  startDate,
  endDate,
  schedules,
  onAddSchedule,
  onUpdateSchedule,
  onRemoveSchedule,
}: Props) => {
  const getDaysInRange = () => {
    const days: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const daysInRange = getDaysInRange();

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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
                .filter((daySchedule) => daySchedule.dayIndex === index)
                .map((schedule) => (
                  <ScheduleBlock
                    key={schedule.id}
                    id={schedule.id}
                    dayIndex={schedule.dayIndex}
                    destination={schedule.destination}
                    description={schedule.description}
                    onUpdateSchedule={onUpdateSchedule}
                    onRemoveSchedule={onRemoveSchedule}
                  />
                ))}
            </ul>
            <button
              type="button"
              onClick={() => onAddSchedule(index)}
              aria-label={`Day ${index + 1} 일정 추가`}
              className="body-2-sb flex h-[40px] w-[295px] items-center justify-center gap-1 rounded bg-blue-100 text-primary-normal"
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
