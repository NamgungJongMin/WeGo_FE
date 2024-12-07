const DateOverTag = ({ endAt }: { endAt: string }) => {
  const now = new Date();
  const endDate = new Date(endAt);

  const tagCss =
    'body-3-sb absolute left-0 top-0 h-8 w-[69px] text-primary-white flex items-center justify-center';
  if (now === endDate) {
    return <div className={`${tagCss} bg-primary-normal`}>오늘 마감</div>;
  }
  return <div className={`${tagCss} bg-label-normal`}>마감</div>;
};
export default DateOverTag;
