'use client';

import { useState } from 'react';
import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import TimePicker from './TimePicker';

interface Props {
  date?: string;
  labelHidden?: boolean;
  placeholder: string;
  id: string;
}

const TimePickerInput = ({
  date,
  labelHidden = false,
  placeholder,
  id,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const inputValue =
    selectedHour === '' ? '' : `${selectedHour}:${selectedMinute}`;

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0'),
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleTimeSelect = (firstTime: string, sencondTime: string) => {
    setSelectedHour(firstTime);
    setSelectedMinute(sencondTime);
  };

  const getLabelState = () => {
    if (date) return 'default';
    if (labelHidden) return 'srOnly';
    return 'required';
  };

  return (
    <div className="relative">
      <TextInputWithLabel
        label={date || '진행시간'}
        state={getLabelState()}
        name={id}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        readOnly
        size="halfButton"
        className={date && '!body-3-m -mb-[2px] text-label-alternative'}
        onClick={handleOpen}
        onChange={() => {}}
      />
      <TimePicker
        firstPicker={{
          timeList: hours,
          isLoop: true,
          selectedIndex: hours.indexOf(selectedHour),
        }}
        secondPicker={{
          timeList: minutes,
          isLoop: true,
          selectedIndex: minutes.indexOf(selectedMinute),
        }}
        isOpen={isOpen}
        onClose={handleClose}
        onSelect={handleTimeSelect}
      />
    </div>
  );
};

export default TimePickerInput;
