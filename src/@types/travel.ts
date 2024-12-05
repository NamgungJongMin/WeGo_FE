export interface Travel {
  travelId: number;
  isDomestic: boolean;
  travelName: string;
  travelLocation: string;
  maxParticipant: number;
  currentParticipant: number;
  startDate: string;
  formattedStartDate?: string;
}
