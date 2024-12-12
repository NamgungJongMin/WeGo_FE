'use client';

import StepRenderer from '@/components/createTrip/steps/StepRenderer';
import FormHeader from '@/components/common/formheader/FormHeader';
import TripRegisterHeader from '@/components/createTrip/tripRegisterHeader/TripRegisterHeader';
import useTravelForm from '@/hooks/useTravelForm';

const MultiStepForm = () => {
  const {
    formData: data,
    currentStep,
    isCurrentStepValid,
    isLoading,
    updateFormData,
    goToNextStep,
    goToPrevStep,
    saveTravelDataTemporarily,
    finalizeTravelCreation,
  } = useTravelForm();

  return (
    <div className="flex h-dvh flex-col">
      <FormHeader
        title="여행 만들기"
        onRoute={currentStep === 0 ? undefined : goToPrevStep}
      />
      <div className="mx-auto mt-9 flex w-[335px] flex-1 flex-col">
        {isLoading ? (
          <div className="flex h-1/2 items-center justify-center">
            로딩중...
          </div>
        ) : (
          <>
            <TripRegisterHeader currentStep={currentStep} />
            <StepRenderer
              currentStep={currentStep}
              formData={data}
              isCurrentStepValid={isCurrentStepValid}
              updateFormData={updateFormData}
              goToNextStep={goToNextStep}
              onSubmit={finalizeTravelCreation}
              onTempSave={saveTravelDataTemporarily}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
