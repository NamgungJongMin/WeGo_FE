'use client';

import { useRef } from 'react';
import { CalendarEvents, Day } from '@/@types/date';
import { Button } from '@/components/common/button/Button';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import DatePickerHeader from './DatePickerHeader';
import DatePickerDays from './DatePickerDays';

interface DatePickerModalProps {
  currentDate: Date;
  days: Day[];
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  calendarEvents: CalendarEvents;
  isOpen: boolean;
  onYearMonthChange: (year: string, month: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const DatePickerModal = ({
  currentDate,
  days,
  selectedStartDate,
  selectedEndDate,
  calendarEvents,
  isOpen,
  onYearMonthChange,
  onClose,
  onConfirm,
}: DatePickerModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-label-strong/40"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-end justify-center">
        <DialogPanel
          ref={modalRef}
          className="rounded-t-lg bg-background-normal px-5 pb-10 pt-8"
          aria-labelledby="datePickerTitle"
          aria-modal="true"
        >
          <DatePickerHeader
            currentDate={currentDate}
            onMonthChange={calendarEvents.adjustMonth}
            onYearMonthChange={onYearMonthChange}
            onClose={onClose}
          />
          <DatePickerDays
            days={days}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            calendarEvents={calendarEvents}
          />
          <Button
            handler={onConfirm}
            className="mt-10"
            disabled={!selectedStartDate}
          >
            선택
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DatePickerModal;
