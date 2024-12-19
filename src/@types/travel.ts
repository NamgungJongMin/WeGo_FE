export interface Travel {
  travelId: number;
  travelName: string;
  isDomestic: boolean;
  travelStatus?: string;
  location: string;
  image: string;
  startAt: string;
  endAt: string;
  maxTravelMateCount: number;
  currentTravelMateCount: number;
  formattedStartDate?: string;
  expectedTripCost?: number;
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
  tripDuration: number;
  travelPlan: TravelPlan[];
  participant: Participant[];
}

export interface Filters {
  startAt: string;
  endAt: string;
  isDomestic: boolean | null;
  sortOrder: 'popular' | 'registrationEnd' | null;
  searchText: string;
}

export const InitialFilters = {
  startAt: '',
  endAt: '',
  isDomestic: null,
  sortOrder: null,
  searchText: '',
} as const;

export interface TravelParams {
  pageParam: number;
  filters?: Filters;
}

export interface TravelFilterResponse {
  travels: Travel[];
  currentPage: number;
  hasNext: boolean;
}
export interface TravelList {
  travelId: number;
  travelName: string;
  expectedTripCost: number;
  travelMateCount: number;
  isDomestic: boolean;
  travelStatus: string;
  location: string;
  image: string;
  startAt: string;
  endAt: string;
  maxTravelMateCount: number;
  currentTravelMateCount: number;
}
