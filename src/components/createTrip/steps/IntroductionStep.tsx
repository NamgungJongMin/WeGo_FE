import { TextInputWithLabel } from '@/components/inputwithlabel/TextInputWithLabel';
import TextareaWithLabel from '@/components/inputwithlabel/TextareaWithLabel';
import { Button } from '@/components/common/button/Button';
import DatePicker from '@/components/createTrip/datepicker/DatePicker';
import ImageUploader from '@/components/createTrip/imageuploader/ImageUploader';
import HashtagCreator from '@/components/createTrip/hashtag/HashtagCreator';
import { formatCurrency, parseCurrency } from '@/utils/currency';
import { FormTravelProps } from '@/@types/travelForm';

const IntroductionStep = ({
  data,
  onChange,
  onNext,
  onTempSave,
  isValid,
}: FormTravelProps) => {
  const {
    travelName,
    expectedTripCost,
    minTravelMateCount,
    maxTravelMateCount,
    registrationEnd,
    travelDescription,
    travelImage,
    hashTags,
  } = data;

  const isMateCountValid =
    !(minTravelMateCount === '' || maxTravelMateCount === '') &&
    parseInt(minTravelMateCount, 10) > parseInt(maxTravelMateCount, 10);

  return (
    <div className="mb-10 flex flex-1 flex-col gap-6">
      <TextInputWithLabel
        label="여행 이름"
        state="required"
        name="travelName"
        type="text"
        value={travelName}
        size="default"
        placeholder="여행 이름을 입력 해 주세요."
        onChange={(e) => onChange('travelName', e.target.value)}
      />
      <TextInputWithLabel
        label="예상 경비"
        state="required"
        name="expectedTripCost"
        type="text"
        value={formatCurrency(expectedTripCost)}
        size="default"
        placeholder="원"
        onChange={(e) => {
          onChange('expectedTripCost', parseCurrency(e.target.value));
        }}
      />
      <div className="flex flex-wrap items-end justify-between">
        <TextInputWithLabel
          label="모집 인원"
          state="required"
          name="minTravelMateCount"
          type="text"
          value={minTravelMateCount}
          size="halfButton"
          placeholder="최소 인원"
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*$/.test(value)) {
              onChange('minTravelMateCount', value);
            }
          }}
          inputClassNameCondition={{
            'border-status-error focus:border-status-error': isMateCountValid,
          }}
        />
        <TextInputWithLabel
          label="모집 인원"
          state="srOnly"
          name="maxTravelMateCount"
          type="text"
          value={maxTravelMateCount}
          size="halfButton"
          placeholder="최대 인원"
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*$/.test(value)) {
              onChange('maxTravelMateCount', value);
            }
          }}
          inputClassNameCondition={{
            'border-status-error focus:border-status-error': isMateCountValid,
          }}
        />
        {isMateCountValid && (
          <span className="body-3-r mt-1 text-status-error">
            최소인원이 최대인원을 초과 하였습니다.
          </span>
        )}
      </div>
      <DatePicker
        label="모집 기한"
        value={registrationEnd}
        onChange={(value) => {
          onChange('registrationEnd', value);
        }}
        isRangeSelectable={false}
      />
      <TextareaWithLabel
        label="여행 소개"
        name="travelDescription"
        state="required"
        size="default"
        value={travelDescription}
        placeholder="여행을 자세하게 소개 해 주세요."
        onChange={(e) => onChange('travelDescription', e.target.value)}
      />
      <ImageUploader
        size="default"
        image={travelImage}
        onChange={(value) => onChange('travelImage', value)}
      />
      <HashtagCreator
        hashtags={hashTags}
        onChange={(value) => onChange('hashTags', value)}
      />

      <div className="mt-6 flex justify-between">
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

export default IntroductionStep;
