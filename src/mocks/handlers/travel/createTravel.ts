import { http, HttpResponse } from 'msw';
import { FAKE_USER_NICKNAME } from '@/mocks/data/auth/auth';

const createTravel = http.post(`/api/travels`, async ({ request }) => {
  const formData = await request.formData();

  const travelName = formData.get('travelName');
  const expectedTripCost = formData.get('expectedTripCost');
  const minTravelMateCount = formData.get('minTravelMateCount');
  const maxTravelMateCount = formData.get('maxTravelMateCount');
  const travelDescription = formData.get('travelDescription');
  const travelImage = formData.get('travelImage');
  const hashTags = formData.get('hashTags');
  const isDomestic = formData.get('isDomestic');
  const travelLocation = formData.get('travelLocation');
  const registrationEnd = formData.get('registrationEnd');
  const startAt = formData.get('startAt');
  const endAt = formData.get('endAt');
  const startTime = formData.get('startTime');
  const endTime = formData.get('endTime');
  const detailTravel = [];

  let index = 0;
  while (formData.has(`detailTravel[${index}].tripDay`)) {
    detailTravel.push({
      tripDay: formData.get(`detailTravel[${index}].tripDay`),
      tripOrderNumber: formData.get(`detailTravel[${index}].tripOrderNumber`),
      destination: formData.get(`detailTravel[${index}].destination`),
      description: formData.get(`detailTravel[${index}].description`),
      destinationImage: formData.get(`detailTravel[${index}].destinationImage`),
    });
    index++;
  }

  if (
    !!travelName &&
    !!expectedTripCost &&
    !!minTravelMateCount &&
    !!maxTravelMateCount &&
    !!travelDescription &&
    !!travelImage &&
    !!hashTags &&
    !!isDomestic &&
    !!travelLocation &&
    !!registrationEnd &&
    !!startAt &&
    !!endAt &&
    !!startTime &&
    !!endTime
  ) {
    return HttpResponse.json(
      {
        message: 'Travel created successfully',
        nickname: FAKE_USER_NICKNAME,
      },
      {
        status: 200,
      },
    );
  }

  return HttpResponse.json({ message: 'Invalid travel data' }, { status: 400 });
});

export default createTravel;
