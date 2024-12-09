'use client';

import { useState } from 'react';
import HashtagInput from './HashtagInput';
import HashtagList from './HashtagList';

const HashtagCreator = () => {
  const [hashtags, setHashtags] = useState<string[]>([]);

  const addHashtag = (tag: string) => {
    if (!tag.trim() || hashtags.includes(tag)) return;

    setHashtags((prev) => [...prev, tag]);
  };

  const removeHashtag = (index: number) => {
    setHashtags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-[335px] flex-col">
      <HashtagInput hashtags={hashtags} onAdd={addHashtag} />
      <HashtagList hashtags={hashtags} onRemove={removeHashtag} />
    </div>
  );
};

export default HashtagCreator;
