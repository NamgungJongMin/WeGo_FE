/* eslint-disable @next/next/no-img-element */

'use client';

import StepRenderer from '@/components/createTrip/steps/StepRenderer';
import Header from '@/components/common/header/Header';
import TripRegisterHeader from '@/components/createTrip/tripRegisterHeader/TripRegisterHeader';
import useTravelForm from '@/hooks/useTravelForm';
import LoadingOverlay from '@/components/common/loding/LoadingOverlay';

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
    <div className="relative flex h-dvh flex-col">
      <Header
        title="여행 만들기"
        onRoute={currentStep === 0 ? undefined : goToPrevStep}
      />
      <div className="mx-5">
        <div className="mx-auto mt-[100px] flex w-full min-w-[335px] max-w-[500px] flex-col xl:mt-[120px]">
          {isLoading ? (
            <LoadingOverlay />
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
    </div>
  );
};

export default MultiStepForm;
