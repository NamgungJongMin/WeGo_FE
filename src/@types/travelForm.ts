export interface FormTravelPlan {
  tripDay: number;
  tripOrderNumber: number;
  destination: string;
  description: string;
  destinationImage: File | null;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface FormTravelData {
  [x: string]: any;
  travelName: string;
  expectedTripCost: string;
  minTravelMateCount: string;
  maxTravelMateCount: string;
  registrationEnd: DateRange;
  travelDescription: string;
  travelImage: File | null;
  hashTags: string[];
  travelLocation: string;
  departureLocation: string;
  isDomestic: boolean;
  startAt: Date | null;
  endAt: Date | null;
  startTime: { hour: string; minute: string };
  endTime: { hour: string; minute: string };
  detailTravel: FormTravelPlan[];
}

export interface FormTravelProps {
  data: FormTravelData;
  isValid: boolean;
  onChange: (
    key: keyof FormTravelData,
    value: FormTravelData[keyof FormTravelData],
  ) => void;
  onNext?: () => void;
  onSubmit?: () => void;
  onTempSave?: () => void;
}
