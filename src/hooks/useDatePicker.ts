import { useState } from 'react';
import { getDaysInMonth } from '@/utils/calendarHelper';

const useDatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [inputStartDate, setInputStartDate] = useState<Date | null>(null);
  const [inputEndDate, setInputEndDate] = useState<Date | null>(null);
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const today = new Date();
  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const calendarEvents = {
    selectDate: (date: Date) => {
      if (!selectedStartDate || (selectedEndDate && !isDragging)) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else if (selectedStartDate.getTime() === date.getTime()) {
        setSelectedStartDate(null);
      } else if (!selectedEndDate) {
        const startDate =
          selectedStartDate.getTime() < date.getTime()
            ? selectedStartDate
            : date;
        const endDate =
          selectedStartDate.getTime() < date.getTime()
            ? date
            : selectedStartDate;
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
      }
    },

    startDrag: (date: Date) => {
      setIsDragging(true);
      setDragStart(date);
    },

    extendSelection: (date: Date) => {
      if (isDragging && dragStart) {
        const startDate = dragStart < date ? dragStart : date;
        const endDate = dragStart > date ? dragStart : date;
        setSelectedStartDate(startDate);
        setSelectedEndDate(endDate);
      }
    },

    endDrag: () => {
      setIsDragging(false);
      setDragStart(null);
    },

    adjustMonth: (offset: number) => {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + offset,
        1,
      );

      const isFutureDate =
        newDate.getFullYear() > today.getFullYear() ||
        (newDate.getFullYear() === today.getFullYear() &&
          newDate.getMonth() >= today.getMonth());

      if (isFutureDate) {
        setCurrentDate(newDate);
      }
    },
  };

  const inputEvents = {
    openCalendar: () => {
      if (inputStartDate) {
        setCurrentDate(
          new Date(inputStartDate.getFullYear(), inputStartDate.getMonth(), 1),
        );
        setSelectedStartDate(inputStartDate);
        setSelectedEndDate(inputEndDate);
      } else {
        setCurrentDate(new Date());
        setSelectedStartDate(null);
        setSelectedEndDate(null);
      }
    },

    confirmSelection: () => {
      setInputStartDate(selectedStartDate);
      setInputEndDate(selectedEndDate);

      setSelectedStartDate(null);
      setSelectedEndDate(null);
    },

    cancelSelection: () => {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    },
  };

  return {
    currentDate,
    selectedStartDate,
    selectedEndDate,
    inputStartDate,
    inputEndDate,
    days,
    calendarEvents,
    inputEvents,
    setSelectedStartDate,
    setSelectedEndDate,
  };
};

export default useDatePicker;
