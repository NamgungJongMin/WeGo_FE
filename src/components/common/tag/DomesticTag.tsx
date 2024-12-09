const DomesticTag = ({ isDomestic }: { isDomestic: boolean }) => {
  return (
    <div className="w-fit rounded-[20px] bg-blue-100 px-[6px] py-[3px] text-[10px] font-semibold text-primary-normal">
      {isDomestic ? '해외여행' : '국내여행'}
    </div>
  );
};

export default DomesticTag;
