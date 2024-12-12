'use client';

import { useEffect } from 'react';
import { FormTravelPlan } from '@/@types/travelForm';

const useTravelSchedules = (
  startDate: Date,
  endDate: Date,
  schedules: FormTravelPlan[],
  onChangeSchedule: (schedules: FormTravelPlan[]) => void,
) => {
  const initDefaultSchedule = () => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = endDate
      ? endDate.getTime() - startDate.getTime()
      : startDate.getTime() - startDate.getTime();
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / oneDayInMilliseconds,
    );

    const days = Array.from({ length: differenceInDays + 1 }, (_, i) => i + 1);

    const initializedSchedules = [...schedules];

    days.forEach((day) => {
      const daySchedules = initializedSchedules.filter(
        (schedule) => schedule.tripDay === day,
      );

      if (daySchedules.length === 0) {
        initializedSchedules.push({
          tripOrderNumber: 1,
          destination: '',
          description: '',
          tripDay: day,
          destinationImage: null,
        });
      }
    });

    onChangeSchedule(initializedSchedules);
  };

  const addSchedule = (dayIndex: number) => {
    onChangeSchedule([
      ...schedules,
      {
        tripOrderNumber:
          schedules.filter((schedule) => schedule.tripDay === dayIndex).length +
          1,
        destination: '',
        description: '',
        destinationImage: null,
        tripDay: dayIndex,
      },
    ]);
  };

  const updateSchedule = (
    id: number,
    field: string,
    value: string | File | null,
    dayIndex: number,
  ) => {
    onChangeSchedule(
      schedules.map((schedule) =>
        schedule.tripDay === dayIndex && schedule.tripOrderNumber === id
          ? { ...schedule, [field]: value }
          : schedule,
      ),
    );
  };

  const removeSchedule = (id: number, dayIndex: number) => {
    const updatedSchedules = schedules.filter(
      (schedule) =>
        !(schedule.tripDay === dayIndex && schedule.tripOrderNumber === id),
    );

    onChangeSchedule(
      updatedSchedules.map((schedule, index, array) => {
        if (schedule.tripDay === dayIndex) {
          const newId =
            array.filter((s) => s.tripDay === dayIndex).indexOf(schedule) + 1;
          return { ...schedule, tripOrderNumber: newId };
        }
        return schedule;
      }),
    );
  };

  useEffect(() => {
    initDefaultSchedule();
  }, []);

  return {
    addSchedule,
    updateSchedule,
    removeSchedule,
  };
};

export default useTravelSchedules;
