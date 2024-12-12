import { Button } from '@/components/common/button/Button';
import ScheduleAccordion from '@/components/createTrip/scheduleAccordion/ScheduleAccordion';
import { FormTravelPlan, FormTravelProps } from '@/@types/travelForm';

const ScheduleStep = ({
  data,
  onChange,
  onSubmit,
  onTempSave,
  isValid,
}: FormTravelProps) => {
  const { startAt, endAt, detailTravel } = data;

  const handleChangeSchedule = (schedules: FormTravelPlan[]) => {
    onChange('detailTravel', schedules);
  };

  return (
    <div className="mb-10 flex flex-1 flex-col gap-6">
      <ScheduleAccordion
        startDate={startAt as Date}
        endDate={endAt || (startAt as Date)}
        schedules={detailTravel}
        onChangeSchedule={handleChangeSchedule}
      />

      <div className="mt-4 flex justify-between">
        <Button
          handler={onTempSave}
          className="mt-auto"
          size="half"
          fill="white"
        >
          임시저장
        </Button>
        <Button disabled={!isValid} handler={onSubmit} size="half">
          완료
        </Button>
      </div>
    </div>
  );
};

export default ScheduleStep;
