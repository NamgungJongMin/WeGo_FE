import { useState } from 'react';
import Close from '@/assets/close_20px.svg';
import Left from '@/assets/left.svg';
import Right from '@/assets/right.svg';
import TimePicker from '@/components/timepicker/TimePicker';

interface Props {
  currentDate: Date;
  onMonthChange: (offset: number) => void;
  onYearMonthChange: (year: string, month: string) => void;
  onClose: () => void;
}

const DatePickerHeader = ({
  currentDate,
  onMonthChange,
  onYearMonthChange,
  onClose,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  today.setHours(0, 0, 0, 0);

  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  );

  const isFutureDate =
    newDate.getFullYear() > currentYear ||
    (newDate.getFullYear() === currentYear &&
      newDate.getMonth() >= currentMonth);

  const years = Array.from({ length: 100 }, (_, i) => `${2024 + i}년`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  const isValid = (year: string, month: string) => {
    const selectedYear = parseInt(year.replace('년', ''), 10);
    const selectedMonth = parseInt(month.replace('월', ''), 10);

    return (
      selectedYear > currentYear ||
      (selectedYear === currentYear && selectedMonth >= currentMonth)
    );
  };

  return (
    <header className="relative mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onMonthChange(-1)}>
          <Left stroke={isFutureDate ? '#222222' : '#989BA1'} />
        </button>
        <button type="button" onClick={handleOpen} className="title-4-b">
          {currentDate.getFullYear()}.
          {(currentDate.getMonth() + 1).toString().padStart(2, '0')}
        </button>
        <button type="button" onClick={() => onMonthChange(1)}>
          <Right />
        </button>
      </div>
      <button type="button" onClick={onClose}>
        <Close />
      </button>
      <TimePicker
        firstPicker={{
          timeList: years,
          isLoop: false,
          selectedIndex: years.indexOf(`${currentDate.getFullYear()}년`),
        }}
        secondPicker={{
          timeList: months,
          isLoop: true,
          selectedIndex: months.indexOf(`${currentDate.getMonth() + 1}월`),
        }}
        isOpen={isModalOpen}
        onClose={handleClose}
        onSelect={onYearMonthChange}
        isValid={isValid}
      />
    </header>
  );
};

export default DatePickerHeader;
