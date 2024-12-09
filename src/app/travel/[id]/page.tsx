import FormHeader from '@/components/common/formheader/FormHeader';
import TravelDetailContainer from '@/components/travel/detail/TravelDetailContainer';

const TravelDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <>
      <FormHeader title="여행상세" />
      <TravelDetailContainer id={id} />
    </>
  );
};
export default TravelDetailPage;
