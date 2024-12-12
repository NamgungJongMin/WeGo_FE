import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import { Button } from '@/components/common/button/Button';
import Location from '@/assets/input_location.svg';
import PlaceSelector from '@/components/createTrip/placeSelector/PlaceSelector';
import { FormTravelProps } from '@/@types/travelForm';

const LocationStep = ({
  data,
  onChange,
  onNext,
  onTempSave,
  isValid,
}: FormTravelProps) => {
  const { travelLocation, departureLocation, isDomestic } = data;

  return (
    <div className="mb-10 flex max-h-[632px] flex-1 flex-col gap-6">
      <PlaceSelector
        selected={isDomestic}
        onChange={(value) => onChange('isDomestic', value)}
      />

      <TextInputWithLabel
        label="진행 장소"
        state="required"
        name="travelLocation"
        type="text"
        value={travelLocation}
        size="default"
        placeholder="여행 이름을 입력 해 주세요."
        onChange={(e) => onChange('travelLocation', e.target.value)}
      >
        <Location />
      </TextInputWithLabel>
      <div>
        <TextInputWithLabel
          label="모이는 장소"
          state="optional"
          name="departureLocation"
          type="text"
          value={departureLocation}
          size="default"
          placeholder="모임 장소를 추가 해 주세요."
          onChange={(e) => onChange('departureLocation', e.target.value)}
        >
          <Location />
        </TextInputWithLabel>
        <span className="body-3-r text-status-infomative">
          진행장소와 모이는 장소가 다를 시 입력 해 주세요.
        </span>
      </div>

      <div className="mt-auto flex justify-between">
        <Button
          handler={onTempSave}
          className="mt-auto"
          size="half"
          fill="white"
        >
          임시저장
        </Button>
        <Button
          disabled={!isValid}
          handler={onNext}
          className="mt-auto"
          size="half"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
