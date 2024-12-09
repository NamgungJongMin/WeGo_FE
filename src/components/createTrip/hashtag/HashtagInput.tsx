'use client';

import { useState, useRef } from 'react';
import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import { Button } from '@/components/common/button/Button';

interface Props {
  hashtags: string[];
  onAdd: (tag: string) => void;
}

const HashtagInput = ({ hashtags, onAdd }: Props) => {
  const [input, setInput] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddHashTag = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const isDisabled = () => !input.trim() || hashtags?.length === 5;

  return (
    <div className="flex items-end gap-4">
      <TextInputWithLabel
        label="해시태그"
        state="required"
        name="hashtag"
        type="text"
        value={input}
        placeholder="해시태그 입력 (최대 5개)"
        size="withButton"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <Button
        handler={handleAddHashTag}
        disabled={isDisabled()}
        size="addon"
        ref={buttonRef}
      >
        등록
      </Button>
    </div>
  );
};

export default HashtagInput;
