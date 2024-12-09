'use client';

import { useState } from 'react';
import useDatePicker from '@/hooks/useDatePicker';
import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import { formatDate } from '@/utils/calendarHelper';
import Calendar from '@/assets/calendar.svg';
import DatePickerModal from './DatePickerModal';

const DatePicker = () => {
  const {
    inputStartDate,
    inputEndDate,
    currentDate,
    selectedStartDate,
    selectedEndDate,
    days,
    calendarEvents,
    inputEvents,
  } = useDatePicker();
  const today = new Date();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCalendar = () => {
    inputEvents.openCalendar();
    setIsOpen(true);
  };

  const handleCloseCalendar = () => {
    inputEvents.cancelSelection();
    setIsOpen(false);
  };

  const handleConfirmCalendar = () => {
    inputEvents.confirmSelection();
    setIsOpen(false);
  };

  const handleYearMonthChange = (year: string, month: string) => {
    calendarEvents.adjustMonth(
      parseInt(month.replace('월', ''), 10) -
        1 -
        currentDate.getMonth() +
        (parseInt(year.replace('년', ''), 10) - currentDate.getFullYear()) * 12,
    );
  };

  const getFormattedDate = () => {
    if (inputStartDate && inputEndDate) {
      return `${formatDate(inputStartDate)} - ${formatDate(inputEndDate)}`;
    }
    if (inputStartDate) {
      return formatDate(inputStartDate);
    }
    return '';
  };

  return (
    <div className="relative">
      <TextInputWithLabel
        label="일정"
        state="required"
        name="selectedDate"
        type="text"
        size="default"
        value={getFormattedDate()}
        placeholder={formatDate(today)}
        readOnly
        onClick={handleOpenCalendar}
        onChange={() => {}}
      >
        <Calendar />
      </TextInputWithLabel>
      <DatePickerModal
        currentDate={currentDate}
        days={days}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        isOpen={isOpen}
        calendarEvents={calendarEvents}
        onYearMonthChange={handleYearMonthChange}
        onClose={handleCloseCalendar}
        onConfirm={handleConfirmCalendar}
      />
    </div>
  );
};

export default DatePicker;
