import Close from '@/assets/close.svg';

interface Props {
  tag: string;
  index: number;
  onRemove: (index: number) => void;
}

const HashtagItem = ({ tag, index, onRemove }: Props) => {
  return (
    <li className="flex items-center gap-[3px] rounded-[20px] border border-slate-200 bg-primary-white py-[3px] pl-1.5 pr-2 text-[10px] font-semibold leading-4 text-slate-500">
      <span>{`# ${tag}`}</span>
      <button
        type="button"
        onClick={() => onRemove(index)}
        aria-label={`해시태그 ${tag} 삭제`}
      >
        <Close />
      </button>
    </li>
  );
};

export default HashtagItem;
