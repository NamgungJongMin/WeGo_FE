'use client';

import { useState } from 'react';
import useDatePicker from '@/hooks/useDatePicker';
import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import { formatDate } from '@/utils/calendarHelper';
import Calendar from '@/assets/calendar.svg';
import DatePickerModal from './DatePickerModal';

interface Props {
  value: { startDate: Date | null; endDate: Date | null };
  onChange: (value: { startDate: Date | null; endDate: Date | null }) => void;
  isRangeSelectable: boolean;
  label: string;
}

const DatePicker = ({ value, onChange, isRangeSelectable, label }: Props) => {
  const {
    currentDate,
    selectedStartDate,
    selectedEndDate,
    days,
    calendarEvents,
    inputEvents,
  } = useDatePicker(value, onChange, isRangeSelectable);
  const { startDate, endDate } = value;
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
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    if (startDate) {
      return formatDate(startDate);
    }
    return '';
  };

  return (
    <div className="relative">
      <TextInputWithLabel
        label={label}
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
        isRangeSelectable={isRangeSelectable}
      />
    </div>
  );
};

export default DatePicker;
