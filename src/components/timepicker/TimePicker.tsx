'use client';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import Close from '@/assets/close_20px.svg';
import { Button } from '@/components/common/button/Button';
import { useState } from 'react';
import TimePickerSlider from './TimePickerSlider';

type Picker = Omit<Parameters<typeof TimePickerSlider>[0], 'onSlide'> & {
  selectedIndex: number;
};

interface Props {
  firstPicker: Picker;
  secondPicker: Picker;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (firstTime: string, secondTime: string) => void;
}

const TimePicker = ({
  firstPicker,
  secondPicker,
  isOpen,
  onClose,
  onSelect,
}: Props) => {
  const [firstTime, setFirstTime] = useState('');
  const [secondTime, setSecondTime] = useState('');

  const handlePickerButton = () => {
    onSelect(firstTime, secondTime);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-label-strong/40"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex w-screen items-end justify-center">
        <DialogPanel
          className="rounded-t-lg bg-background-normal px-5 pb-10 pt-8"
          aria-labelledby="timePickerTitle"
          aria-modal="true"
        >
          <div className="mb-8 flex items-center justify-between">
            <DialogTitle id="timePickerTitle" className="title-4-b">
              시간 설정
            </DialogTitle>
            <button type="button" onClick={onClose} aria-label="시간 설정 닫기">
              <Close />
            </button>
          </div>
          <div className="flex gap-x-4">
            <TimePickerSlider
              timeList={firstPicker.timeList}
              isLoop={firstPicker.isLoop}
              selectedIndex={firstPicker.selectedIndex}
              onSlide={(time: string) => setFirstTime(time)}
            />
            <TimePickerSlider
              timeList={secondPicker.timeList}
              isLoop={secondPicker.isLoop}
              selectedIndex={secondPicker.selectedIndex}
              onSlide={(time: string) => setSecondTime(time)}
            />
          </div>
          <Button handler={handlePickerButton} className="mt-10">
            선택
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TimePicker;
