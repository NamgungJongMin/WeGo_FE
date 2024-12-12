const DateOverTag = ({ endAt }: { endAt: string }) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const endDate = new Date(endAt.replace(/\./g, '-'));
  const tagCss =
    'body-3-sb absolute left-0 top-0 h-8 w-[69px] text-primary-white flex items-center justify-center';
  if (now.getTime() === endDate.setHours(0, 0, 0, 0)) {
    return <div className={`${tagCss} bg-primary-normal`}>오늘 마감</div>;
  }
  if (now.getTime() > endDate.setHours(0, 0, 0, 0)) {
    return <div className={`${tagCss} bg-label-normal`}>마감</div>;
  }
  return null;
};
export default DateOverTag;
