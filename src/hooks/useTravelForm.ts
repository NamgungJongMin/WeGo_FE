'use client';

import { useState, useEffect, useCallback } from 'react';
import { FormTravelData } from '@/@types/travelForm';
import {
  clearIndexedDB,
  getFormTravelData,
  saveFormTravelData,
  removeFormTravelData,
} from '@/utils/travelIndexedDB';
import useCreateTravel from '@/queries/travel/useCreateTravel';
import useToast from '@/hooks/useToast';
import { usePathname, useRouter } from 'next/navigation';

const defaultInitialData: FormTravelData = {
  travelName: '',
  expectedTripCost: '',
  minTravelMateCount: '',
  maxTravelMateCount: '',
  registrationEnd: {
    startDate: null,
    endDate: null,
  },
  travelDescription: '',
  travelImage: null,
  hashTags: [],
  travelLocation: '',
  departureLocation: '',
  isDomestic: true,
  startAt: null,
  endAt: null,
  startTime: { hour: '', minute: '' },
  endTime: { hour: '', minute: '' },
  detailTravel: [],
};

const useTravelForm = () => {
  const [formData, setFormData] = useState<FormTravelData>(defaultInitialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { mutate: createTravel } = useCreateTravel();
  const { showToast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  const validations = {
    isIntroductionValid:
      !!formData.travelName &&
      !!formData.expectedTripCost &&
      !!formData.minTravelMateCount &&
      !!formData.maxTravelMateCount &&
      parseInt(formData.minTravelMateCount, 10) <=
        parseInt(formData.maxTravelMateCount, 10) &&
      !!formData.registrationEnd.startDate &&
      !!formData.travelDescription &&
      !!formData.travelImage &&
      formData.hashTags.length > 0,

    isLocationValid: !!formData.travelLocation,

    isDateValid:
      !!formData.startAt &&
      !!formData.startTime.hour &&
      !!formData.startTime.minute &&
      !!formData.endTime.hour &&
      !!formData.endTime.minute &&
      formData.startAt.getTime() +
        parseInt(formData.startTime.hour, 10) * 60 * 60 * 1000 +
        parseInt(formData.startTime.minute, 10) * 60 * 1000 <=
        (formData.endAt
          ? formData.endAt.getTime()
          : formData.startAt.getTime()) +
          parseInt(formData.endTime.hour, 10) * 60 * 60 * 1000 +
          parseInt(formData.endTime.minute, 10) * 60 * 1000,

    isScheduleValid: formData.detailTravel.every(
      (schedule) =>
        schedule.destination.trim() !== '' &&
        schedule.description.trim() !== '' &&
        schedule.destinationImage !== null,
    ),
  };

  const isCurrentStepValid = [
    validations.isIntroductionValid,
    validations.isLocationValid,
    validations.isDateValid,
    validations.isScheduleValid,
  ][currentStep];

  const updateFormData = useCallback(
    <K extends keyof FormTravelData>(key: K, value: FormTravelData[K]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const goToNextStep = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const saveTravelDataTemporarily = async () => {
    try {
      await saveFormTravelData(formData, 1);
      showToast('임시저장이 완료되었습니다.', 'success');
      sessionStorage.setItem('currentStep', currentStep.toString());
    } catch (error) {
      showToast('임시저장에 실패했습니다.', 'error');
    }
  };

  const finalizeTravelCreation = async () => {
    try {
      await removeFormTravelData(1);
      sessionStorage.removeItem('currentStep');
    } catch (error) {
      console.error('IndexedDB 데이터 삭제 중 오류 발생:', error);
    } finally {
      createTravel(formData);
    }
  };

  const closePreview = async () => {
    try {
      await removeFormTravelData(2);
      router.push('/');
    } catch (error) {
      console.error('IndexedDB 데이터 삭제 중 오류 발생:', error);
    }
  };

  const goBackPreview = async () => {
    try {
      await removeFormTravelData(2);
      router.back();
    } catch (error) {
      console.error('IndexedDB 데이터 삭제 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('pagehide', async (event) => {
      try {
        if (!event.persisted) {
          await clearIndexedDB();
        }
      } catch (error) {
        console.error('IndexedDB 데이터 삭제 중 오류 발생:', error);
      }
    });
  }, []);

  useEffect(() => {
    let storedPreviewData: FormTravelData | null;
    const loadInitialData = async () => {
      try {
        if (pathname === '/travel/new') {
          const savedStep = sessionStorage.getItem('currentStep');
          if (savedStep) {
            setCurrentStep(parseInt(savedStep, 10));
          }
          const storedData = await getFormTravelData(1);
          if (storedData) {
            delete storedData.id;
            setFormData(storedData);
          }
        } else if (pathname === '/travel/new/preview') {
          storedPreviewData = await getFormTravelData(2);
          if (!storedPreviewData) {
            // 데이터를 찾을 수 없을 경우 바로 메인 페이지로 이동
            router.push('/');
            return; // 여기서 return을 제거 가능
          }
          delete storedPreviewData.id;
          setFormData(storedPreviewData);
        }
      } catch (error) {
        console.error('초기 데이터를 로드하는 중 오류 발생:', error);
      } finally {
        if (pathname !== '/travel/new/preview' || storedPreviewData) {
          setIsLoading(false);
        }
      }
    };

    loadInitialData();
  }, []);

  return {
    formData,
    currentStep,
    isCurrentStepValid,
    isLoading,
    updateFormData,
    goToNextStep,
    goToPrevStep,
    saveTravelDataTemporarily,
    finalizeTravelCreation,
    closePreview,
    goBackPreview,
  };
};

export default useTravelForm;
