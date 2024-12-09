import { v4 as uuidv4 } from 'uuid';
import HashtagItem from './HashtagItem';

interface Props {
  hashtags: string[];
  onRemove: (index: number) => void;
}

const HashtagList = ({ hashtags, onRemove }: Props) => {
  return (
    <ul className="mt-2.5 flex flex-wrap gap-x-1.5 gap-y-2">
      {hashtags.map((tag, index) => (
        <HashtagItem
          key={uuidv4()}
          tag={tag}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default HashtagList;
