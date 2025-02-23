import TextareaWithLabel from '@/components/inputwithlabel/TextareaWithLabel';
import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import ImageUploader from '@/components/createTrip/imageuploader/ImageUploader';

interface Props {
  id: number;
  dayIndex: number;
  destination: string;
  description: string;
  destinationImage: File | null;

  onUpdateSchedule: (
    id: number,
    field: string,
    value: string | File | null,
    dayIndex: number,
  ) => void;
  onRemoveSchedule: (id: number, dayIndex: number) => void;
}

const ScheduleBlock = ({
  id,
  dayIndex,
  destination,
  description,
  destinationImage,
  onUpdateSchedule,
  onRemoveSchedule,
}: Props) => {
  const handleChange = (field: string, value: string | File | null) => {
    onUpdateSchedule(id, field, value, dayIndex);
  };

  const handleRemove = () => {
    onRemoveSchedule(id, dayIndex);
  };

  return (
    <li
      className="relative flex w-full flex-col gap-6 border-b border-line-neutral py-6 first:pt-0 last:border-0"
      aria-labelledby={`schedule-title-${id}`}
    >
      <span className="body-2-sb absolute right-0 text-gray-500">
        {id.toString().padStart(2, '0')}
      </span>
      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Day ${dayIndex + 1}, 일정 ${id} 삭제`}
        className={`body-3-m absolute right-[28px] top-[26px] text-primary-normal underline ${id === 1 && 'hidden'} `}
      >
        삭제
      </button>
      <TextInputWithLabel
        size="full"
        label="목적지"
        state="required"
        name={`destination-${id}`}
        type="text"
        value={destination}
        placeholder="목적지를 입력 해 주세요."
        onChange={(e) => handleChange('destination', e.target.value)}
        inputClassName="bg-background-alternative border-0"
      />
      <ImageUploader
        size="small"
        image={destinationImage}
        onChange={(imageUrl) => handleChange('destinationImage', imageUrl)}
      />
      <TextareaWithLabel
        label="설명"
        state="required"
        name={`description-${id}`}
        value={description}
        placeholder="목적지에 대한 설명을 입력 해 주세요."
        size="small"
        onChange={(e) => handleChange('description', e.target.value)}
        textareaClassName="bg-background-alternative w-full"
        extraClassName="w-full bg-background-alternative"
        maxLength={500}
      />
    </li>
  );
};

export default ScheduleBlock;
