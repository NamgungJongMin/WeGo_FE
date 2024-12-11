export interface Travel {
  travelId: number;
  isDomestic: boolean;
  image: string;
  travelName: string;
  travelLocation: string;
  maxParticipant: number;
  currentParticipant: number;
  startDate: string;
  formattedStartDate?: string;
}

export interface TravelPlan {
  tripDay: number;
  tripOrderNumber: number;
  destination: string;
  description: string;
  image: string;
}

export interface Participant {
  id: number;
  nickname: string;
  role: string;
  profileImage: string;
}

export interface TravelDetail {
  travelId: number;
  name: string;
  description: string;
  image: string;
  expectedTripCost: number;
  currentTravelMateCount: number;
  minTravelMateCount: number;
  maxTravelMateCount: number;
  hashTags: string;
  isDomestic: boolean;
  travelLocation: string;
  departureLocation: string;
  startAt: string;
  endAt: string;
  registrationEnd: string;
  tripDuration: number; // 여행 기간
  travelPlan: TravelPlan[];
  participant: Participant[];
}
