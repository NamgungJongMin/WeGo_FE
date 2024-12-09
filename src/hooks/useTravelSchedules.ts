import { useState, useEffect } from 'react';
import { Schedule } from '@/@types/date';

interface Props {
  startDate: Date;
  endDate: Date;
}

const useTravelSchedules = ({ startDate, endDate }: Props) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const initDefaultSchedule = () => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / oneDayInMilliseconds,
    );

    const initialSchedules = Array.from(
      { length: differenceInDays + 1 },
      (_, i) => ({
        id: 1,
        destination: '',
        description: '',
        dayIndex: i,
      }),
    );

    setSchedules(initialSchedules);
  };

  const addSchedule = (dayIndex: number) => {
    setSchedules((prev) => [
      ...prev,
      {
        id:
          prev.filter((schedule) => schedule.dayIndex === dayIndex).length + 1,
        destination: '',
        description: '',
        dayIndex,
      },
    ]);
  };

  const updateSchedule = (
    id: number,
    field: string,
    value: string,
    dayIndex: number,
  ) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.dayIndex === dayIndex && schedule.id === id
          ? { ...schedule, [field]: value }
          : schedule,
      ),
    );
  };

  const removeSchedule = (id: number, dayIndex: number) => {
    setSchedules((prev) => {
      const updatedSchedules = prev.filter(
        (schedule) => !(schedule.dayIndex === dayIndex && schedule.id === id),
      );

      return updatedSchedules.map((schedule, index, array) => {
        if (schedule.dayIndex === dayIndex) {
          const newId =
            array.filter((s) => s.dayIndex === dayIndex).indexOf(schedule) + 1;
          return { ...schedule, id: newId };
        }
        return schedule;
      });
    });
  };

  useEffect(() => {
    initDefaultSchedule();
  }, []);

  return {
    schedules,
    addSchedule,
    updateSchedule,
    removeSchedule,
  };
};

export default useTravelSchedules;
