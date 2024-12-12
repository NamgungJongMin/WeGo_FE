import HashtagInput from './HashtagInput';
import HashtagList from './HashtagList';

interface Props {
  hashtags: string[];
  onChange: (updatedHashtags: string[]) => void;
}

const HashtagCreator = ({ hashtags, onChange }: Props) => {
  const addHashtag = (tag: string) => {
    if (!tag.trim() || hashtags.includes(tag)) return;

    onChange([...hashtags, tag]); // 상태를 부모 컴포넌트로 전달
  };

  const removeHashtag = (index: number) => {
    onChange(hashtags.filter((_, i) => i !== index)); // 상태를 부모 컴포넌트로 전달
  };

  return (
    <div className="flex w-[335px] flex-col">
      <HashtagInput hashtags={hashtags} onAdd={addHashtag} />
      <HashtagList hashtags={hashtags} onRemove={removeHashtag} />
    </div>
  );
};

export default HashtagCreator;
