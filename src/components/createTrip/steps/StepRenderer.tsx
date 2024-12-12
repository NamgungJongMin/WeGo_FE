import IntroductionStep from '@/components/createTrip/steps/IntroductionStep';
import LocationStep from '@/components/createTrip/steps/LocationStep';
import DateStep from '@/components/createTrip/steps/DateStep';
import ScheduleStep from '@/components/createTrip/steps/ScheduleStep';
import { FormTravelData } from '@/@types/travelForm';

const StepRenderer = ({
  currentStep,
  formData,
  isCurrentStepValid,
  updateFormData,
  goToNextStep,
  onSubmit,
  onTempSave,
}: {
  currentStep: number;
  formData: FormTravelData;
  isCurrentStepValid: boolean;
  updateFormData: (
    key: keyof FormTravelData,
    value: FormTravelData[keyof FormTravelData],
  ) => void;
  goToNextStep: () => void;
  onSubmit: () => void;
  onTempSave: () => void;
}) => {
  switch (currentStep) {
    case 0:
      return (
        <IntroductionStep
          data={formData}
          isValid={isCurrentStepValid}
          onChange={updateFormData}
          onNext={goToNextStep}
          onTempSave={onTempSave}
        />
      );
    case 1:
      return (
        <LocationStep
          data={formData}
          isValid={isCurrentStepValid}
          onChange={updateFormData}
          onNext={goToNextStep}
          onTempSave={onTempSave}
        />
      );
    case 2:
      return (
        <DateStep
          data={formData}
          isValid={isCurrentStepValid}
          onChange={updateFormData}
          onNext={goToNextStep}
          onTempSave={onTempSave}
        />
      );
    case 3:
      return (
        <ScheduleStep
          data={formData}
          isValid={isCurrentStepValid}
          onChange={updateFormData}
          onSubmit={onSubmit}
          onTempSave={onTempSave}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
